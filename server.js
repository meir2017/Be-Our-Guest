
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




app.get('/beOurGuest/addNewEvent', (req, res) => {
    // Title: "",
    // Date: "",
    // Location: "",
    // maxGuests: "",
    // HostName: ""

    // let event = req.params.EventInfo;
    // myEvent = new Event({
    //     Title: event.Title,
    //     Date: event.Date,
    //     Location: event.Location,
    //     maxGuests: event.maxGuests,
    //     HostName: event.HostName,
    //     tables: [],
    //     invitations: [],
    //     guests: [],
    // }) 
    console.log("meir test")
    // res.send("meir");
    let myEvent = new Event({
        Title: "חתונה ",
        Date: "20/02/2019",
        Location: "תל אביב",
        maxGuests: 280,
        HostName: "מאיר",
        tables: [],
        invitations: [],
        guests: [],
    })

    myEvent.save(function (err, event) {
        console.log(event.id)
        res.send(event.id);
    })
});



// myEvent = new Event({
//     Title: "חתונה ",
//     Date: "20/02/2019",
//     Location: "תל אביב",
//     maxGuests: 280,
//     HostName: "מאיר",
//     tables: [],
//     invitations: [],
//     guests: [],
// })

// Title: String,
// Date: Date,
// Location: String,
// maxGuests: Number,
// HostName: String,
// tables: [{ type: Schema.Types.ObjectId, ref: 'table' }],
// invitations: [{ type: Schema.Types.ObjectId, ref: 'invitation' }],
// guests: [{ type: Schema.Types.ObjectId, ref: 'guest' }],



const port = process.env.PORT || 3001;
app.listen(port, console.log('Server running on port', port));
