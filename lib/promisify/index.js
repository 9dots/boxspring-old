/**
 * Modules
 */

var sliced = require('sliced');

/**
 * Polyfill
 */

require('es6-promise').polyfill();

/**
 * Turns node style callback async `fn` into function
 * that returns a promise
 *
 * @param {Function} fn
 * @return {Function}
 */

module.exports = function(fn, ctx) {
  return function() {
    var args = sliced(arguments);
    return new Promise(function(resolve, reject) {
      args.push(function(err, val) {
        if (err) return reject(err);
        resolve(val);
      });
      fn.apply(ctx, args);
    });
  };
};