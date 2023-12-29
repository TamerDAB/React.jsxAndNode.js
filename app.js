'use strict'
/**
 * Name Programming:
 * NAME: Tamer Dbdob
 * ID: 026519637
 * Class:47/2
 */


// Creating app with express
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');


const fileUpload = require('express-fileupload');
const fs = require('fs');

// Defining port
const port = process.env.PORT || 3001;

// Enable CORS for any website
app.use(cors()); 

// parse form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

// automatically load all FE files included
// static assets

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, 'FE/build')));
// app.use(express.static(path.resolve(__dirname, '../client/build')));


// Get routers
const signUpRouter = require('./routes/sign-up-router');
const loginRouter = require('./routes/login-router');
const characterRouter = require('./routes/character-router');

//Using routers
app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
app.use('/characters', characterRouter);


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/FE/build', 'index.html'));
  });

// Running the app on port
const expressListener = app.listen(port, () => console.log('app is online'));
    console.log('Listen on port ' + port );

