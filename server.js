"use strict";
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SERVER_PORT = 3001;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(SERVER_PORT, () => console.log('Server started on port' + SERVER_PORT));


mongoose.connect('mongodb://localhost/beOurGuestDB',  function () {
  console.log("DB connection established!!!");
});



