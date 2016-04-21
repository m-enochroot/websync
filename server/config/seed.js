/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

import del from 'del';

//Thing.find({}).removeAsync();

//del('./public/uploads/*');


User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@gfi.fr',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@gfi.fr',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
