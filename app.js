const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join('uploads')));

// About
const aboutRoute = require('./routes/about');
app.use('/about', aboutRoute);

// Profile
const profileRoute = require('./routes/profile');
app.use('/profile', profileRoute);

// Experience
const experienceRoute = require('./routes/experience');
app.use('/experience', experienceRoute);

// Project
const projectRoute = require('./routes/project');
app.use('/project', projectRoute);

// ROUTES
app.get('/', (req, res) => {
    res.send('We are on home!')
})

mongoose.connect(
    process.env.DB_CONNCETION,
    { useNewUrlParser: true }, 
    () => console.log('connected to DB')    
);

module.exports = app;
