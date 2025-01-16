const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    forgotPasswordOtp:{
        type: Number,
        default: null
    },
    forgotPasswordOtpExpiry:{
        type: Date,
        default: null
    }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;