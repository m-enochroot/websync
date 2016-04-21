'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  user: String,
  active: Boolean,
  code: String,
  path: String,
  date: String
});

export default mongoose.model('Thing', ThingSchema);
