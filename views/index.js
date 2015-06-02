/**
 * Modules
 */

var express = require('express');
var react = require('express-react-views');

var app = module.exports = express();

app.set('view engine', 'jsx');
app.engine('jsx', react.createEngine());

app.get('*', function(req, res, next) {

  if(req.url === '' || /html/.test(req.headers.accept || '')) {
    return res.render('index', {title: 'Boxspring'});
  }
  
  next();

});
