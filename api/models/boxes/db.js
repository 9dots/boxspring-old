var Redis = require('ioredis');
var R = require('ramda');

var redis = Redis();

var compile = require('string-template/compile');

var boxesKey = compile('/users/{username}/boxes');

/**
 * Redis commands
 */


exports.create = function(box) {
  return redis.hset(boxesKey({username: box.owner.username}), box.name, JSON.stringify(box));
};

exports.get = function(owner, box) {
  return redis.hget(boxesKey({username: owner}), box).then(JSON.parse);
};

exports.all = function(username) {
  return redis.hgetall(boxesKey({username: username})).then(R.mapObj(JSON.parse));
};

exports.del = function(username, box) {
  return redis.hdel(boxesKey({username: username}), box);
};


