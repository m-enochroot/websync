/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import crypto from 'crypto';

import express from 'express';
import moment from 'moment';

import Thing from './api/thing/thing.model';

import multer from 'multer';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + '_' + file.originalname);
    })
  }
});

var upload = multer({ storage : storage });


export default function(app) {
  // Insert routes below
  app.use('/res', express.static('public/uploads', { 'setHeaders' : setHeaders }));

  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|res|components|app|bower_components|assets)/*')
   .get(errors[404]);


  function setHeaders(res, filepath) {
    console.log(filepath);
    var filename = path.basename(filepath).split(/_(.+)?/)[1];
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  }

  app.post('/upload', upload.single('file'), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(req.file.originalname);
    console.log(req.file.filename);
    Thing.create({
      name: req.file.originalname,
      info: 'Data file',
      code: req.file.filename,
      date: moment().format('LLLL')
    });

  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
