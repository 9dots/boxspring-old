var express = require('express');


var actions = require('./actions');
var middleware = require('./middleware');
var schemas = require('./schemas');

var app = module.exports = express();



app.use('/users/me', middleware.auth.user);

/**
 * List boxes for authenticated user
 */

app.get('/users/me/boxes', actions.boxes.list);

/**
 * List boxes for `user`
 */

app.get('/users/:username/boxes', actions.boxes.list);

/**
 * Create new box for authenticated user
 */

app.post('/user/boxes', 
  middleware.auth, 
  middleware.setBoxV
  actions.boxes.create);

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
  middleware.box.validateSet 
  actions.boxes.update
);

/**
 * Add file to box
 */

app.post('/boxes/:owner/:box/files',
  middleware.file.validateSet, 
  middleware.box.get,
  actions.files.create
);


/**
 * Get files in box
 */

app.get('/boxes/:owner/:box/files', actions.files.list);



/**
 * Update file in box
 */

app.post('/boxes/:owner/:box/files/:file', actions.files.update);

/**
 * Update path in box
 */

app.post('/boxes/:owner/:box/paths/:path', action.files.updatePath);


/**
 * Delete file from box
 */

app.del('/boxes/:owner/:box/files/:file', actions.files.del);


