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

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

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

  /** API path that will upload the files */
  app.post('/upload', function (req, res) {
    upload(req, res, function (err) {

      // Manage errors
      if (err) {
        res.json({
          error_code: 1,
          err_desc:err
        });
        return;
      }

      // Create the file in database
      Thing.create({
        name: req.file.originalname,
        user: req.body.username,
        info: 'Data file',
        code: req.file.filename,
        date: moment().format('LLLL')
      });

      // Return successfull response
      res.json({
        error_code: 0,
        err_desc: null
      });
    });
  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
