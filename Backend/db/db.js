const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectDB() {
    const mongoURI = process.env.MONGO_URI
    
    mongoose.connect(mongoURI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => { 
        console.log('Connected to the database');
    })
    .catch((err) => { 
        console.error('Database connection error:', err);
    });
}

module.exports = connectDB;
