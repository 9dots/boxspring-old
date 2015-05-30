var Redis = require('ioredis');
var redis = Redis();
var format = require('string-template');
var R = require('ramda');

var boxKey = format('/boxes/{fullName}/files');

exports.create = function(file) {
  return redis.hset(filesKey(file.box), file.path, JSON.stringify(file));
};

exports.get = function(owner, box, path) {
  return redis.hget(fileKey(partialBox(owner, box)), path)
    .then(JSON.parse);
};

exports.list = function(owner, box) {
  return redis.hgetall(filesKey(partialBox(owner, box)))
    .then(R.mapObj(JSON.parse));
}

exports.del = function(owner, box, path) {
  return redis.hdel(filesKey(partialBox(owner, box)), path);
}

/**
 * Utilities
 */

function partialBox(owner, box) {
  return {fullName: owner + '/' + box};
}