// Middlewares
const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');

// MongoDB
const uri = process.env.DB_CONNECT;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('Successfully connected'))
.catch(() => console.log('Connection failed'))



const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/auth', authRoutes);
app.use('/user', userRoutes);

module.exports = app;