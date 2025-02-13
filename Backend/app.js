const donenv = require('dotenv');
donenv.config();
const express = require('express');
const app = express();
const path = require('path')
const cors=require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const userRouter = require('./routes/user.route.js');
const doctorRouter = require('./routes/doctor.route.js');
const adminRouter = require('./routes/admin.route.js');

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/user', userRouter);
app.use('/doctor',doctorRouter)
app.use('/admin',adminRouter)



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




module.exports = app;
