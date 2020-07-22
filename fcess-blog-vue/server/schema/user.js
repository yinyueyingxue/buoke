'use strict'
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createTime: String,
});

module.exports = mongoose.model('User', userSchema);
