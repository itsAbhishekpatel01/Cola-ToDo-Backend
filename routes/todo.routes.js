const express = require('express')
const {getAllTodo, createTodo, deleteTodo,updateTodo} = require('../controllers/todo.controllers');
const { protectRoute } = require('../middleware/user.middleware');

const todoRouter = express.Router();

todoRouter.post('/',protectRoute, getAllTodo);

todoRouter.post('/add/', protectRoute, createTodo);

todoRouter.delete('/delete/:id', deleteTodo)
todoRouter.put('/update/:id', updateTodo)

module.exports = {todoRouter};
