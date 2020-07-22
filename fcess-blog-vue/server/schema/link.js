'use strict'
var mongoose = require('mongoose');

var linkSchema = new mongoose.Schema({
    title: String,
    url: String,
    createTime: String
});

module.exports = mongoose.model('Link', linkSchema);
