"use strict";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const inlineCss = require('nodemailer-juice');
const axios = require('axios');
const app = express();

mongoose.connect('mongodb://localhost/beOurGuestDB', () => {
  console.log("DB connection established!!!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//modals   
const Event = require('./models/EventModel');
const Table = require('./models/TableModel');
const User = require('./models/UserModel')
const GlobalGuest = require('./models/GlobalGuestModel')
const Guest = require('./models/GuestModel')

// app.get('/', (req, res) => res.send('Hello World!'))

////// emil send
app.get('/meir/:mytext', (req, res) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'BeOurGuestMail@gmail.com',
        pass: 'guest2018'
    }
  });

  // transporter.use('compile', inlineCss());
  let mailOptions = {
    from: 'Be Our Guest ',
    to: req.params.mytext,
    subject: 'Sending Email using Node.js',
    html: '<h1 style="color:lightskyblue">Welcome</h1><p>That was easy!</p>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send('Mail sent to ' + req.params.mytext)
})

// Forgot tPassword  
app.get('/beOurGuest/ForgotPassword/:userEmail', (req, res) => {
  User.findOne({ email: req.params.userEmail }).
    then(user => {
      console.log(req.params.userEmail)

      console.log("user is=  " + user.email)
      if (user != null) {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'BeOurGuestMail@gmail.com',
            pass: 'guest2018'
          }
        });
        let mailOptions = {
          from: 'BeOurGuestMail@gmail.com',
          to: user.email,
          subject: 'Reset password',
          html: '<h3 > user name :' + user.username + '<br> password :' + user.password + ' </h3><p>Be Our Guest</p>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.send(error);
          } else {
            console.log('Email sent: ' + user.username);
            res.send('Your password is waiting for you by e-mail')
          }
        });
      } else {
        console.log(' no user account');
        res.send("There is no account for this email");
      }
    })
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
    newUser.save((err, user) => {
      res.send(user);
    })
});

//login   and get user model
app.post('/beOurGuest/login', (req, res) => {
  let userinfo = req.body;
  User.findOne({ $and: [{ username: userinfo.name }, { password: userinfo.pass }] }).
    populate('events').
    exec((err, user) => {
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

  myEvent.save((err, event) => {
    console.log(event.id)
    User.findById(req.params.UserId).
      then(user => {
        let listEvent = user.events.concat();
        listEvent.push(event.id);
        user.events = listEvent;
        user.save();
        res.send(event);
      });
  })
});

//add guest
app.post('/beOurGuest/addNewGuest/:userId/:eventId/', (req, res) => {
  let newGuest = req.body;
  let myGlobalGuest = new GlobalGuest({
    name: newGuest.name,
    email: newGuest.email,
    phone: newGuest.phone
  })

  User.findById(req.params.userId)
  .then(user => {
    if (user === null) {
      res.send(user);
    }

    myGlobalGuest.save()
    .then(globalGuest => {
      // Add guest to user's globalGuest list
      let guestList = user.guests.concat();
      guestList.push(globalGuest._id);
      user.guests = guestList;
      user.save();
      console.log('GlobalGuest ' + globalGuest._id + ' saved to user list');

      // Create guest object
      let myGuest = new Guest({
        globalGuest_id: globalGuest._id,
        invitations:[],
        categories: newGuest.categories,
        comment: newGuest.comment,
        numConfirmed: 0,
        numUndecided: newGuest.numInvited,
        numNotComing: 0,
        seated: false
      });

      Event.findById(req.params.eventId)
      .then(event => {
        if (event === null) {
          res.send(event);
        }

        // Add guest to event's guest list
        myGuest.save()
        .then(guest => {
          let guestList = event.guests.concat();
          guestList.push(guest._id);
          event.guests = guestList;
          event.save();
          console.log('Guest ' + guest._id + ' saved to event list');

          let newGuest = {
            globalGuestId: globalGuest._id,
            name: globalGuest.name,
            email: globalGuest.email,
            phone: globalGuest.phone,

            guestId: guest._id,
            invitations: guest.invitations,
            categories: guest.categories,
            comment: guest.comment,
            numConfirmed: guest.numConfirmed,
            numUndecided: guest.numInvited,
            numNotComing: guest.numNotComing,
            seated: false
          };

          console.log(newGuest.id);
          res.send(newGuest);
        });
      });
    });
  })
  .catch(err => {
    console.log(err);
  })
});

const port = process.env.PORT || 3001;
app.listen(port, console.log('Server running on port', port));
