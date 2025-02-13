const mongoose =require('mongoose')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const sendOtpTemplate = require('../utils/sendOtpTemplate')
const sendEmail = require('../utils/sendEmail');
const registrationTemplate = require('../utils/registrationTemplate');
const { generateToken } = require('../utils/tokenUtils');
const jwt = require('jsonwebtoken');

const register = async (req, res)=>{
    try {
        const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Please provide username, email and password!',
        });
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Email already registered',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await User.create({
        username,
        email,
        password:hashedPassword
    })
    if(savedUser){
        // generate the jwt token here
        generateToken(savedUser._id, res);
        await savedUser.save();
        const subject = 'Welcome to Cola Todo!';
        const text = registrationTemplate({username});
        await sendEmail(email, subject, text);
        return res.status(200).json({
            success: true,
            error: false,
            message : 'User registered successfully',
            savedUser
        });
    }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Error creating new user',
            details: error.message
        });
    }
}

const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
    if(!email || !password){
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Please provide email and password',
        });
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Email not registered'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(200).json({
                    success: false,
                    error: true,
                    message: 'Invalid credentials',
        });
    }
    // generateToken(user._id, res);
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax', // ensure cross-site sending
        maxAge: 3600000
    })
    return res.status(200).json({
                success: true,
                error: false,
                message : "Login successfull",
                user
    })
    } catch (error) {
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Error logging in',
                    details: error.message
        });
    }
}

const logout = async (req,res) => {
    try {
        res.cookie("jwt", '', {maxAge: 0});
        return res.status(200).json({message: 'Logout successful'});
    } catch (error) {
        console.log('Logout error',error);
        res.status(500).json({message: 'Server error', error});
    }
}

const forgotPassword = async (req,res)=>{
    try {
        const {email} = req.body;
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                        success: false,
                        error: true,
                        message: 'Email not registered'
            });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expireTime = Date.now() + 300000; // 5 minutes

        const updatedUser = await User.findByIdAndUpdate(user._id,{
            forgotPasswordOtp:otp,
            forgotPasswordOtpExpiry:expireTime
        })

        const subject = 'OTP for password reset';
        const text = sendOtpTemplate({otp});
        await sendEmail(email, subject, text);
        return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Check your email for OTP',
        });

    } catch (error) {
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Error sending OTP',
                    details: error.message
        });
        
    }
}

const verifyForgotPasswordOtp = async (req,res)=>{
    try {

        const { email , otp }  = req.body
        if(!email || !otp){
            return res.status(400).json({
                message : "Provide required field email, otp.",
                error : true,
                success : false
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message : "Email not registered",
                error : true,
                success : false
            })
        }
        const currentTime = Date.now();
        if(currentTime > user.forgotPasswordOtpExpiry){
            return res.status(400).json({
                message : "OTP expired",
                error : true,
                success : false
            })
        }

        if(user.forgotPasswordOtp !== Number(otp)){
            return res.status(400).json({
                message : "Wrong OTP",
                error : true,
                success : false
            })
        }
        return res.status(200).json({
            message : "OTP verified successfully",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Error verifying OTP',
                    details: error.message
        });
    }
}

const resetPassword = async (req,res)=>{
    try {
        const { email, otp, newPassword } = req.body;
        if(!email || !otp || !newPassword){
            return res.status(400).json({
                message : "Provide required field email, otp, newPassword.",
                error : true,
                success : false
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message : "Email not registered",
                error : true,
                success : false
            })
        }
        const currentTime = Date.now();
        if(currentTime > user.forgotPasswordOtpExpiry){
            return res.status(400).json({
                message : "OTP expired",
                error : true,
                success : false
            })
        }

        if(user.forgotPasswordOtp !== Number(otp)){
            return res.status(400).json({
                message : "Wrong OTP",
                error : true,
                success : false
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await User.findByIdAndUpdate(user._id,{
            password: hashedPassword,
            forgotPasswordOtp: null,
            forgotPasswordOtpExpiry: null
        })
        return res.status(200).json({
            message : "Password reset successfully",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Error resetting password',
                    details: error.message
        });
    }
}

const checkAuth = async (req,res)=>{
    try {
        console.log('Yes they came to me, i am checking auth');
        return res.status(200).json({user: req.user});
    } catch (error) {
        console.log('Check auth error',error);
        res.status(500).json({message: 'Server error', error});
    }
}

module.exports = {register, login,logout, forgotPassword, verifyForgotPasswordOtp, resetPassword, checkAuth};