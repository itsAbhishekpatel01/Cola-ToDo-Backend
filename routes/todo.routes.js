const express = require('express')
const {getAllTodo, createTodo, deleteTodo} = require('../controllers/todo.controllers')

const todoRouter = express.Router();

todoRouter.get('/', getAllTodo);

todoRouter.post('/add', createTodo);

todoRouter.delete('/delete/:id', deleteTodo)
module.exports = {todoRouter};
