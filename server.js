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
const GlobalGuest = require('./models/GlobalGuestModel')
const Guest = require('./models/GuestModel')
const Invitation = require('./models/InvitationModel');
const Category = require('./models/CategoryModel');

// app.get('/', (req, res) => res.send('Hello World!'))

////// emil send example
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

  res.send('Mail sent to ' + req.params.mytext)
})

// Forgot tPassword  
app.get('/beOurGuest/ForgotPassword/:userEmail', (req, res) => {
  User.findOne({ email: req.params.userEmail })
    .then(user => {
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
      }
    });
})

//rsvp test
app.get('/beOurGuest/SendRsvpToGuest/:email', (req, res) => {
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
    to: req.params.email,
    subject: 'be our guest',
    html: '<h2 style="color:lightskyblue"><a href="http://localhost:3000/beuorguest/rsvp/:evntid/:guestid">enter to rsvp</a></h2><p>Be Our Guest</p>'
  };
  //http://localhost:3000/beuorguest/rsvp/:evntid/:guestid
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Email sent: ' + user.username);
      res.send('Your password is waiting for you by e-mail')
    }
  });
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
    // populate('events').  categories
    populate({
      path: 'events',
      populate: {
        path: 'invitations'
      }
    })
    .populate({
      path: 'events',
      populate: {
        path: 'tables',
      }
    })
    .populate("categories")
    .populate({
      path: 'events',
      populate: {
        path: 'guests', populate: {
          path: 'globalGuest_id'
        }
      }
    })

    // post.deepPopulate('comments.user', function (err, _post) {
    //   // _post is the same instance as post and provided for convenience
    // });


    .populate('guests')
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
            invitations: [],
            categories: newGuest.categories,
            comment: newGuest.comment,
            numInvited: newGuest.invited,
            numConfirmed: newGuest.coming,
            numNotComing: newGuest.notComing,
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
                    numInvited: guest.numInvited,
                    numConfirmed: guest.numConfirmed,
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
  //     .then(result => Event.findByIdAndRemove({ _id: req.params.eventId })
  //         .then(res.send("event delete"))

  //     );
});

// add  Invitation
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
//remove  Invitation
app.delete('/beOurGuest/removeInvitation/:eventId/:eventIndex/:index/', (req, res) => {

  Event.findById(req.params.eventId, function (err, eve) {
    if (err) return handleError(err);
    eve.invitations.splice(req.params.index, 1)
    eve.save(Invitation.findByIdAndRemove({ _id: req.params.eventId })
      .then(res.send("delete invitation")))
  })
})

// get rsvp page
app.get('/beOurGuest/rsvpGuest/:vetId/', (req, res) => {
  let item = req.params
  console.log(item.vetId);
  Invitation.findById(item.vetId, function (err, vet) {
    if (err) return handleError(err);
    res.send(vet);
  })
})

/// send rsvp to email
app.post('/beOurGuest/rsvpEmail/:vetId/:eventId/', (req, res) => {
  let item = req.body
  let vetId = req.params.vetId;
  let eventId = req.params.eventId;

  Guest.
    find({}).
    populate({ path: 'globalGuest_id', select: 'email' }).
    exec(function (err, mYguest) {
      if (err) return handleError(err);
      mYguest.forEach(guest => {
        console.log(guest.globalGuest_id.email)

        /////
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
          to: guest.globalGuest_id.email,
          subject: item.titleInput,
          html: `<div style="background-color:${item.background};padding:20px">
          <h2 style="color:${item.titleColor}, font-family:${item.fontTitle}">${item.titleInput}</h2>
          <div style="white-space: pre-wrap;padding: 10px;color:${item.bodyColor};font-family: ${item.fontBody}">
          <h3>${item.textInput}</h3>
          </div>
          <p>${item.whenEvent}<br>
          ${item.whereEvent}</p>
          <button style="background-color:#91ff35;border-radius: 10px">
          <a  href="http://localhost:3000/beuorguest/rsvp/${vetId}/${eventId}/${guest._id}/">Confirm your arrival</a>
          </button>

          <br>
        </div>  `

          // html: '<h1 style="color:'+sadas+'">Welcome</h1><p>Be Our Guest</p>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        ////
      });
      res.send(JSON.stringify(mYguest))
    });




  // console.log(x++)
  // console.log(element.globalGuest_id.email)


  // console.log("vetId  "+item.vetId);

  // Invitation.findById(item.vetId, function (err, vet) {
  //   if (err) return handleError(err);
  //   res.send(vet);
  // })
})

// guest return Answer

app.post('/beOurGuest/rsvp/guestAnswer/', (req, res) => {
  // checkedB    numGuest   guestId 
  let item = req.body
  Guest.findById(req.body.guestId).
    then(guest => {
      console.log(guest)
      console.log("numConfirmed  " + guest.numConfirmed);
      console.log("numUndecided  " + guest.numUndecided);
      // guest.numNotComing
      // guest.numConfirmed
      // gest.numUndecided
      guest.save();
      console.log("rsvp Change")
      res.send()
    })
})

//  Table //////
//createTable
app.post('/beOurGuest/createTable/:eventId/', (req, res) => {
  let newTable = new Table({
    title: req.body.title,
    maxGuests: req.body.maxGuests,
    category: req.body.category,
    guests: []
  })
  console.log(JSON.stringify(newTable))
  newTable.save((err, table) => {
    console.log(table.id)
    Event.findById(req.params.eventId).
      then(eve => {
        let listtables = eve.tables.concat();
        listtables.push(table.id);
        eve.tables = listtables;
        eve.save();
        res.send(table);
      });
  })

})

//createCtgory
app.post('/beOurGuest/addNewCategory/:UserId', (req, res) => {
  let item = req.body;
  let newCategory = new Category({
    name: item.name,
    colorCode: item.colorCode,
  })

  newCategory.save((err, category) => {
    User.findById(req.params.UserId).
      then(user => {
        let listCategory = user.categories.concat();
        listCategory.push(category.id);
        user.categories = listCategory;
        user.save();
        res.send(category);
      });
  })
});



const port = process.env.PORT || 3001;
app.listen(port, console.log('Server running on port', port));


