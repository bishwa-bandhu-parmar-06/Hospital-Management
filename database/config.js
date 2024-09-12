const mongoose = require('mongoose');

const connect = () => {
    const dbURI = 'mongodb://localhost/hospital_database'; // Replace with your MongoDB URI

    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('MongoDB disconnected through app termination');
            process.exit(0);
        });
    });
};

module.exports = { connect };
