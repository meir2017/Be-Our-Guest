
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const inlineCss = require('nodemailer-juice');
const app = express();

const axios = require('axios');



app.get('/', (req, res) => res.send('Hello World!'))

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


const port = process.env.PORT || 3001;
app.listen(port, console.log('Server running on port', port));