const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const database = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

const connectDB = async () => {
    try {
        await mongoose.connect(database);
        console.log('MongoDB Connected Successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;