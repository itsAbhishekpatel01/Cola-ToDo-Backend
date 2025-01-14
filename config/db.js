const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/colatodo');
        console.log('Database connected');
    } catch (error) {
        console.log('Error connecting database', error.message);
    }
}

module.exports = connectDB;