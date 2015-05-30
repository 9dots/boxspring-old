var ware = require('ware');
var sliced = require('sliced');

module.exports = function() {
  var pipeline = sliced(arguments);
  var w = ware(pipeline);

  return function(req, res, next) {
    w.run(req, res, next);
  };
}