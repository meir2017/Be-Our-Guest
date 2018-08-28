"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let categorySchema = new mongoose.Schema({
    name: String,
});

let Category = mongoose.model('category', categorySchema);

module.exports = Category;


let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new mongoose.Schema({
    nameCategory: String,
    colorCode: String
});

let Guest = mongoose.model('guest', categorySchema);

module.exports = Category;