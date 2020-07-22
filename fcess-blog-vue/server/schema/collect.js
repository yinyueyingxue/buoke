'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var collectSchema = new mongoose.Schema({
  username: String,
  blog_id: { type: Schema.Types.ObjectId, ref: 'Article'},
  iscollect: Boolean
});

module.exports = mongoose.model('Collect', collectSchema);
