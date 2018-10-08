const express = require('express');
const router = express.Router();
//modals   
 //const Event = require('./Models/EventModel');
 //const Table = require('./Models/TableModel');
const User = require('./../Models/UserModel')
//const GlobalGuest = require('./Models/GlobalGuestModel');
//const Guest = require('./Models/GuestModel');
//const Invitation = require('./Models/InvitationModel');
//const Category = require('./Models/CategoryModel');

//***************  User ***************//
//new user
router.post('/beOurGuest/newUser', (req, res) => {
    let userinfo = req.body;
    User.findOne({ username: userinfo.inputText }).exec((err, userName) => {
        if (err) return handleError(err);
        if (userName != null)
            res.send("user")
        else {
            User.findOne({ email: userinfo.emailText }).exec((err, userEmail) => {
                if (err) return handleError(err);
                if (userEmail != null)
                    res.send("email")
                else {
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
                }
            })

        }
    });



});

//login   and get user model
router.post('/beOurGuest/login', (req, res) => {
    let userinfo = req.body;
    User.findOne({ $and: [{ username: userinfo.name }, { password: userinfo.pass }] })
        // populate('events').  categories
        .populate({
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
        .populate('guests')
        .exec((err, user) => {
            if (err) return handleError(err);
            if (user == null)
                res.send(null)
            else
                res.send(user);
        });
});

module.exports = router;
