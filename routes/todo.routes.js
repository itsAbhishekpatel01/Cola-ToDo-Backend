const express = require('express')
const {getAllTodo, createTodo, deleteTodo,updateTodo} = require('../controllers/todo.controllers')

const todoRouter = express.Router();

todoRouter.get('/', getAllTodo);

todoRouter.post('/add', createTodo);

todoRouter.delete('/delete/:id', deleteTodo)
todoRouter.put('/update/:id', updateTodo)
module.exports = {todoRouter};
