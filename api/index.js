var express = require('express');
var bodyParser = require('body-parser')

var actions = require('./actions');
var middleware = require('./middleware');
var schemas = require('./schemas');

var app = module.exports = express();

app.use(bodyParser.json());

app.use('/users/me', middleware.auth.user);

/**
 * Create new box for authenticated user
 */

app.post('/user/boxes', 
  middleware.auth.user, 
  middleware.box.validateSet,
  actions.boxes.create);



/**
 * List boxes for `user`
 */

app.get('/users/:username/boxes', actions.boxes.list);



/**
 * Add auth middleware to /boxes/me
 */

app.use('/boxes/me', middleware.auth.user);

/**
 * Get box
 */


app.get('/boxes/:owner/:box', actions.boxes.get);


/**
 * Update box
 */

app.post('/boxes/:owner/:box',
  middleware.box.validateSet, 
  actions.boxes.update
);

