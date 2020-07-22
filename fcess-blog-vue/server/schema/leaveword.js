'use strict'
var mongoose = require('mongoose');

var wordsSchema = new mongoose.Schema({
  from_uid: String,
  words: String,
  createTime: String,
});

module.exports = mongoose.model('Word', wordsSchema);
