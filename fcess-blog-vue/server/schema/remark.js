'use strict'
var mongoose = require('mongoose');

var remarksSchema = new mongoose.Schema({
  from_uid: String,
  content: String,
  createTime: String,
  blog_id: String
});

module.exports = mongoose.model('Remark', remarksSchema);
