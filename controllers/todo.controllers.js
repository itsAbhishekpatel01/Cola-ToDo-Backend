const mongoose = require('mongoose')
const Todo = require("../models/todo.models");

const getAllTodo = async(req,res)=>{
    const todos = await Todo.find();
    return res.status(200).json({
        success: true,
        error: false,
        todos : todos
    })
}

const createTodo = async (req, res)=>{
    try {
        const {task, priority} = req.body;
    if(!task){
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Please add task',
        });
    }
    const addedTask = await Todo.create({
        task:task,
        priority:priority
    })
    return res.status(200).json({
        success: true,
        error: false,
        message : "successfull",
        addedTask
    })
    } catch (error) {
        console.log('Error adding a new task', error);
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Error adding a new task',
                    details: error.message
        });
    }
}

const deleteTodo = async(req,res)=>{
    try {
        const {id} = req.params;
    if(!id){
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Please provide todo id',
        });
    }
    console.log(id);
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if(!deleteTodo){
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'No Todo found with this todo id',
        });
    }
    return res.status(200).json({
                success: true,
                error: false,
                message : 'Todo is deleted',
                deleteTodo
    })
    } catch (error) {
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Error deleting todo',
                    details: error.message
        });
    }
}

module.exports = {createTodo, getAllTodo, deleteTodo};



