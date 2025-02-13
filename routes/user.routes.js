const express  = require('express');
const { register, login, forgotPassword, verifyForgotPasswordOtp, resetPassword, logout, checkAuth} = require('../controllers/user.controllers');
const { protectRoute } = require('../middleware/user.middleware');


const userRouter = express.Router();

//for registration
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp);
userRouter.post('/reset-password', resetPassword);

// new routes
userRouter.post('/logout', logout);
userRouter.get('/check', protectRoute, checkAuth);

module.exports = {userRouter};