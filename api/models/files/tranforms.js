var R = require('ramda');
var uuid = require('node-uuid');

var config = require('lib/config')

exports.create = function(box, file) {
  file.type = 'file';
  file.box = R.pick(['id', 'fullName', 'displayName'], box);
  file.createdAt = (new Date()).toISOString();
  file.fullPath = file.box.fullName + '/' + file.path;
  file.contentURL = config.CONTENT_ROOT + '/' + file.fullPath;
};
