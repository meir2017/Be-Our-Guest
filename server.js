"use strict";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const inlineCss = require('nodemailer-juice');
const axios = require('axios');
const app = express();

mongoose.connect('mongodb://localhost/beOurGuestDB', function () {
    console.log("DB connection established!!!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//modals   
const Event = require('./models/EventModel');
const Table = require('./models/TableModel');
const User = require('./models/UserModel')
// app.get('/', (req, res) => res.send('Hello World!'))

////// emil send

app.get('/meir/:mytext', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'BeOurGuestMail@gmail.com',
            pass: 'guest2018'
        }
    });
    // transporter.use('compile', inlineCss());
    var mailOptions = {
        from: 'Be Our Guest ',
        to: req.params.mytext,
        subject: 'Sending Email using Node.js',
        html: '<h1 style="color:lightskyblue">Welcome</h1><p>That was easy!</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send('swnd mail to  ' + req.params.mytext)
})
////end
//new user
//{inputText: "meir", emailText: "66meir46", passText: "1212", passConfirm: "1212"}
app.post('/beOurGuest/newUser', (req, res) => {
    let userinfo = req.body;
    let newUser = User({
        username: userinfo.inputText,
        password: userinfo.passText,
        email: userinfo.emailText,
        events: [],
        guests: [],
        categories: []
    })
    newUser.save(function (err, user) {
        // console.log(user.id)
        res.send(user.id);
    })
});
app.post('/beOurGuest/addNewEvent/:UserId', (req, res) => {
    let event = req.body;
    let myEvent = new Event({
        Owner: req.params.UserId,
        Title: event.Title,
        Date: event.Date,
        Location: event.Location,
        maxGuests: event.maxGuests,
        HostName: event.HostName,
        tables: [],
        invitations: [],
        guests: [],
    })
    myEvent.save(function (err, event) {
        console.log(event.id)
        res.send(event.id);
    })
});

const port = process.env.PORT || 3001;
app.listen(port, console.log('Server running on port', port));
