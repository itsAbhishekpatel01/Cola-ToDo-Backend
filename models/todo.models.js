const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
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