const mongoose = require('mongoose')
const User = require('./user.model')

const todoSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        reference: 'User'
    },
    task:{
        type: String,
        required: true
    },
    priority:{
        type: String,
        default:'medium'
    },
    status:{
        type: String,
        enum: ['Pending', 'Done'],
        default: 'Pending'
    }
}, {timestamps:true})

const Todo = new mongoose.model('Todo', todoSchema);

module.exports = Todo;