const express  = require('express');
const { register, login, forgotPassword, verifyForgotPasswordOtp, resetPassword} = require('../controllers/user.controllers');


const userRouter = express.Router();

//for registration
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp);
userRouter.post('/reset-password', resetPassword);

module.exports = {userRouter};