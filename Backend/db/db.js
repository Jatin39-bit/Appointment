const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => { console.log('Connected to the database') }).catch((err) => { console.log(err) });
}

module.exports = connectDB;