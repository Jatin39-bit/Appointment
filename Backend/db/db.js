const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectDB() {
    const fallbackURI = "mongodb+srv://hoodajatin88:ZAQwsxzaqWSX12%23@cluster0.dtjs0.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0";
    const mongoURI = process.env.MONGO_URI || fallbackURI;
    
    mongoose.connect(fallbackURI, { 
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
