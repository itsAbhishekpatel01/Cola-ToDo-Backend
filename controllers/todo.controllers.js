const mongoose = require('mongoose')
const Todo = require("../models/todo.models");
const User = require('../models/user.model');

const getAllTodo = async(req,res)=>{
    const {userId} = req.body;
    const todos = await Todo.find({userId});
    return res.status(200).json({
        success: true,
        error: false,
        todos : todos
    })
}

const createTodo = async (req, res)=>{
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(500).json({
                        success: false,
                        error: true,
                        message: 'User is not found',
            });
        }
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
        priority:priority,
        userId
    })
    return res.status(200).json({
        success: true,
        error: false,
        message : "Todo added successfully",
        todo:addedTask
    })
    } catch (error) {
        console.log('Error adding a new todo', error);
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Error adding a new todo',
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
                message : 'Todo deleted successfully',
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

const updateTodo = async(req,res)=>{
    try {
        const {id} = req.params;
        const {task, priority, status} = req.body;
    if(!id){
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Please provide todo id',
        });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, {task, priority, status}, {new:true});
    if(!updatedTodo){
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'No Todo found with this todo id',
        });
    }
    return res.status(200).json({
                success: true,
                error: false,
                message : 'Todo updated successfully',
                todo:updatedTodo
    })
    } catch (error) {
        return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Error updating todo',
                    details: error.message
        });
    }
}

module.exports = {createTodo, getAllTodo, deleteTodo, updateTodo};



