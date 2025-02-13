const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectDB() {
    mongoose.connect(process.env.MONGO_URI || mongodb+srv://hoodajatin88:ZAQwsxzaqWSX12#@cluster0.dtjs0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0).then(() => { console.log('Connected to the database') }).catch((err) => { console.log(err) });
}

module.exports = connectDB;
