var Redis = require('ioredis');
var redis = Redis();

var format = require('string-template');

var boxesKey = format('/users/{username}/boxes');


/**
 * Redis commands
 */


exports.create = function(box) {
  return redis.hset(boxesKey({username: box.owner.username}), box.name, JSON.stringify(box));
};

exports.get = function(owner, box) {
  return redis.hget(boxesKey(owner), box);
};

exports.list = function(username) {
  return redis.hgetall(boxesKey({username: username}));
};

exports.del = function(username, box) {
  return redis.hdel(boxesKey({username: username}), box);
};


