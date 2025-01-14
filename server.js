const express = require('express')
const connectDB = require('./config/db');
const { todoRouter } = require('./routes/todo.routes');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

connectDB();


const PORT = process.env.PORT;
const app = express();


app.use(express.json());

// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors());

app.use('/api/todo', todoRouter)

app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
})