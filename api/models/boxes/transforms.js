var slug = require('slug');
var uuid = require('node-uuid');

exports.create = function(user, box) {
  box.id = uuid.v1();
  box.type = 'box';
  box.owner = user;
  box.createdAt = (new Date()).toISOString();
  box.updatedAt = (new Date()).toISOString();
  computeNames(box);
  return box;
};  

exports.update = function(box) {
  box.updatedAt = (new Date()).toISOString();
  computeNames(box);
  return box;
};

function computeNames(box) {
  box.name = slug(box.displayName).toLowerCase();
  box.fullName = box.owner.username + '/' + box.name;
  return box;
};