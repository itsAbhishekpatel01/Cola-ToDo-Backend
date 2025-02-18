const express = require('express')
const connectDB = require('./config/db');
const { todoRouter } = require('./routes/todo.routes');
const {userRouter} =require('./routes/user.routes');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const PORT = process.env.PORT;
const app = express();


app.use(express.json());

app.use(cors({
    origin: [`${process.env.LOCAL_FRONTEND_URL}`, `${process.env.PRODUCTION_FRONTEND_URL}`],
}));


app.use('/api/todo', todoRouter)
app.use('/api/user', userRouter)

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server started running on port ${PORT}`);
    })
})