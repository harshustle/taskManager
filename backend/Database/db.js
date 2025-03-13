const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;
const connectDB = async () => {
try {
        await mongoose.connect(DB_URL);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;