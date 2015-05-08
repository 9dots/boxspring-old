/**
 * Modules
 */

var express = require('express');
var compression = require('compression')
var http = require('http');
var debug = require('debug')('boxspring');

/**
 * Expose compositor.
 */

var app = module.exports = express();

// compress
app.use(compression());

// config
app.set('port', process.env.PORT || 3000);

// mount

app.use('/static', express.static(__dirname + '/build'));

//app.use('/api')

app.use(require('./views'));

// start
http.createServer(app).listen(app.get('port'), function(){
  debug("Express server listening on port " + app.get('port'));
});





