'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  code: String,
  path: String,
  date: String
});

export default mongoose.model('Thing', ThingSchema);
