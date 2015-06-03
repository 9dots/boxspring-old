var boxes = require('../models').boxes;

exports.create = function(req, res, next) {
  var user = req.params['user'];
  var box = req.body; //TODO validate

  boxes.create(user, box).then(function() {
    res.send(200);
  }).catch(next);
};

exports.get = function(req, res, next) {
  var owner = req.param('owner');
  var box = req.param('box');
  boxes.get(owner, box).then(res.json).catch(next);
};

exports.list = function(req, res, next) {
  var username = req.params['username'];
  boxes.list(username).then(function(list){
    console.log('list', list);
    res.json(list);
  }).catch(next);
};

exports.update = function(req, res, next) {
  var owner = req.param('owner');
  var box = req.param('box');
  var fields = req.body;

  boxes.update(owner, box, fields).then(function() {
    res.send(200);
  }).catch(next);
};

exports.del = function(req, res, next) {
  var owner = req.param('owner');
  var box = req.param('box');
  boxes.del(owner, box).then(function() {
    res.send(200);
  }).catch(next);
};