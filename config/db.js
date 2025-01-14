const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async()=>{
    try {
        const dummy = process.env.PORT || 'error';
        console.log(dummy);
        const connectionInstance =await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('Database connected');
    } catch (error) {
        console.log('Error connecting database', error.message);
    }
}

module.exports = connectDB;