const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('images'));

// Images
const imageRoute = require('./routes/images');
app.use('/images', imageRoute);

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