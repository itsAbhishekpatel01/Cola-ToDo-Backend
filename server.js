const express = require('express')
const connectDB = require('./config/db');
const { todoRouter } = require('./routes/todo.routes');
const cors = require('cors');

connectDB();

const PORT = process.env.PORT;

const app = express();


app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api/todo', todoRouter)

app.listen(3000, ()=>{
    console.log('Server started running on port:3000')
})