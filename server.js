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
const User = require('./models/UserModel');
const Invitation = require('./models/InvitationModel');

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
        html: '<h1 style="color:lightskyblue">Welcome</h1><p>Be Our Guest</p>'
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
//rsvp
app.get('/beOurGuest/SendRsvpToGuest/:email', (req, res) => {

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
        to: req.params.email,
        subject: 'be our guest',
        html: '<h2 style="color:lightskyblue"><a href="http://localhost:3000/beuorguest/rsvp/:evntid/:guestid">enter to rsvp</a></h2><p>Be Our Guest</p>'
    };
    //http://localhost:3000/beuorguest/rsvp/:evntid/:guestid
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send('swnd mail to  ' + req.params.mytext)
})

// Forgo tPassword  
app.get('/beOurGuest/ForgotPassword/:userEmail', (req, res) => {
    User.findOne({ email: req.params.userEmail }).
        then(user => {
            console.log(req.params.userEmail)

            console.log("user is=  " + user.email)
            if (user != null) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'BeOurGuestMail@gmail.com',
                        pass: 'guest2018'
                    }
                });
                var mailOptions = {
                    from: 'BeOurGuestMail@gmail.com',
                    to: user.email,
                    subject: 'Reset password',
                    html: '<h3 > user name :' + user.username + '<br> password :' + user.password + ' </h3><p>Be Our Guest</p>'
                };
                transporter.sendMail(mailOptions, function (error, info) {
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
    newUser.save(function (err, user) {
        res.send(user);
    })
});

//login   and get user model
app.post('/beOurGuest/login', (req, res) => {
    let userinfo = req.body;
    User.findOne({ $and: [{ username: userinfo.name }, { password: userinfo.pass }] }).
        // populate('events').
        populate({
            path: 'events',
            populate: {
                path: 'invitations'
            }
        })
        .exec(function (err, user) {
            if (err) return handleError(err);
            res.send(user);
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

// remove event
app.delete('/beOurGuest/removEvent/:userId/:eventId/:index', (req, res) => {
    console.log("user id  +" + req.params.userId)
    console.log("event id  +" + req.params.eventId)
    User.findOne({ _id: req.params.userId })
        .then(user => {
            listEvents = user.events.concat();
            listEvents.splice(req.params.index, 1);
            user.events = listEvents;
            user.save()
                .then(() => Event.findByIdAndRemove({ _id: req.params.eventId }))
                .then(res.send("event delete"))
        })

    // User.update({ _id: req.params.userId }, { $pull: { events: { _id: req.params.eventId } } })
    //     .then(result =>
    //         Event.findByIdAndRemove({ _id: req.params.eventId })
    //             .then(res.send("event delete"))
    //     );
});

// add new Invitation
app.post('/beOurGuest/saveInvitation/:eventId/', (req, res) => {
    let vet = req.body;

    vet = new Invitation({
        invitationName: vet.invitationName,
        titleInput: vet.titleInput,
        textInput: vet.textInput,
        background: vet.background,
        titleColor: vet.titleColor,
        bodyColor: vet.bodyColor,
        fontTitle: vet.fontTitle,
        fontBody: vet.fontBody,
        whenEvent: vet.whenEvent,
        whereEvent: vet.whereEvent,
    })
    vet.save(function (err, newVet) {
        console.log(newVet.id);
        Event.findById(req.params.eventId, function (err, eve) {
            if (err) return handleError(err);
            eve.invitations.push(newVet.id);
            eve.save(res.send(JSON.stringify(newVet)))
        })
    })
});
//remove new Invitation
app.delete('/beOurGuest/removeInvitation/:eventId/:eventIndex/:index/', (req, res) => {

    Event.findById(req.params.eventId, function (err, eve) {
        if (err) return handleError(err);
        eve.invitations.splice(req.params.index, 1)
        eve.save(Invitation.findByIdAndRemove({ _id: req.params.eventId })
            .then(res.send("delete invitation")))
    })
})

app.post('/beOurGuest/rsvpGuest/', (req, res) => {
    let item = req.body
    console.log(item.vetId);
    Invitation.findById(item.vetId, function (err, vet) {
        if (err) return handleError(err);
        res.send(vet);
    })
})
// guest return Answer
app.post('/beOurGuest/rsvp/Answer/', (req, res) => {


    // Event.
    //     findById(req.body.eventID).
    //     populate({
    //         path: 'guests',
    //         populate: {
    //             path: 'invitations'
    //         }
    //     }).
    //     exec(function (err, story) {
    //         if (err) return handleError(err);

    //     });

    /////////////////////////////
    // Event.
    //     findById(req.body.eventID).
    //     populate({
    //         path: 'guests',
    //         populate: {
    //             path: 'invitations'
    //         },
    //         match: { _Id: { $$eq: req.body.gestID } }
    //     }).
    //     exec(function (err, eve) {
    //         if (err) return handleError(err);
    //         eve.guests[0].invitations
    //     });


})
const port = process.env.PORT || 3001;
app.listen(port, console.log('Server running on port', port));
