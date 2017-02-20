const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// config file
const config = require('./config')


// mongoose config
mongoose.connect(config.database.url);

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database.url);
});

mongoose.connection.on('error', (error) => {
    console.log('database ' + error);
    return false;
});


// express app
const app = express();

const users = require('./routes/users');

// port
const port = 3000;

// CORS Middelware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// bodyParser Middelware
app.use(bodyParser.json());

// passport Middelware
app.use(passport.initialize());
app.use(passport.session());
config.passport(passport);

// users routes
app.use('/users',users);

// default get request
app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'))
});


// app startup
app.listen(port,() => {
    console.info('app listen on localhost:' + port);
});