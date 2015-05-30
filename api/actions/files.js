var files = require('../models').files;



exports.create = function(req, res, next) {
  var box = req.box;
  var file = req.body;

  files.create(box, file).then(function() {
    res.send(200);
  }).catch(next);
};

exports.get = function(req, res, next) {
  var owner = req.param('owner');
  var box = req.param('box');

  files.get(owner, box).then(res.json).catch(next);
};


exports.list = function(req, res, next) {
  var owner = req.param('owner');
  var box = req.param('box');

  files.list(owner, box).then(res.json).catch(next);
};

exports.update = function(req, res, next) {
  var owner = req.param('owner');
  var box = req.param('box');
  var fields = req.body;

  files.update(owner, box, fields).then(function() {
    res.send(200);
  }).catch(next);
};

exports.del = function(req, res, next) {
  var owner = req.param('owner');
  var box = req.param('box');

  files.del(owner, box).then(function() {
    res.send(200);
  }).catch(next);
};