let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Table = require('./TabletModel');
let GlobalGuest = require('./InvitationModel');
let Category = require('./CategoryModel');


let eventSchema = new mongoose.Schema({
    tables:  [{type: Schema.Types.ObjectId, ref: 'table'}],
    invitations:  [{type: Schema.Types.ObjectId, ref: 'invitation'}],
    maxGuests: Number,
    guests: [{type: Schema.Types.ObjectId, ref: 'guest'}],
});

let _Event = mongoose.model('event', eventSchema);

module.exports = _Event;
