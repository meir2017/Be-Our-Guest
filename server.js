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


//new user
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
        res.send(user);
    })
});

//login   To change get
app.post('/beOurGuest/login', (req, res) => {
    let userinfo = req.body;
    User.findOne({ $and: [{ username: userinfo.name }, { password: userinfo.pass }] }).
        populate('events').
        exec(function (err, user) {
            if (err) return handleError(err);
            res.send(user);
            console.log('The events[0].Title is %s', user.events[0].Title);
            // prints "The author is Ian Fleming"
        });
});

//add event
app.post('/beOurGuest/addNewEvent/:UserId', (req, res) => {
    let event = req.body;
    let myEvent = new Event({
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
        User.findById(req.params.UserId).
            then(user => {
                let listEvent = user.events.concat();
                listEvent.push(event.id);
                user.events = listEvent;
                user.save();
                res.send(event);
            })

    })
});

const port = process.env.PORT || 3001;
app.listen(port, console.log('Server running on port', port));
