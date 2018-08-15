let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Guest = require('./GuestModel');
let Category = require('./CategoryModel');


let tableSchema = new mongoose.Schema({
    title: String,
    number: Number,
    maxGuests: Number,
    categories: [{type: Schema.Types.ObjectId, ref: 'category'}],
    guests: [{type: Schema.Types.ObjectId, ref: 'guests'}]
});

let Table = mongoose.model('table', tableSchema);

module.exports = Table;
