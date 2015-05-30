
var validate = require('lib/mw-validate');

var models = require('../models');
var schemas = require('../schemas');

exports.get = function(req, res, next) {
  var owner = req.param('owner');
  var box = req.param('box');
  models.boxes.get(owner, box).then(function(box) {
    req.box = box;
    next();
  }).catch(next);
};

exports.validateSet = validate(schemas.box.pick('displayName').others(false));