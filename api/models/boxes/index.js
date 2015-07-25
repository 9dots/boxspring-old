
var po = require('@weo-edu/po');

var R = require('ramda');

var transforms = require('./transforms');
var db = require('./db');


var extend = R.merge(R.__);


var boxes = exports;


/**
 * Create a box
 *
 * @param {Object} user
 * @param {Object} box
 * @return {Boolean}
 */

boxes.create = po(
  transforms.create,
  db.create
);


/**
 * Get a box
 *
 * @param {String} owner
 * @param {String} box
 * @return {Object}
 */

boxes.get = db.get;

/**
 * List boxes
 *
 * @param {String} username
 * @return {Array}
 */

boxes.list = po(
  db.all,
  R.values,
  R.sortBy(R.compose(negativeDate, R.prop('updatedAt')))
);

/**
 * Update a box
 *
 * @param {String} owner 
 * @param {String} box
 * @param {Object} fields 
 * @return {Boolean}
 */

boxes.update = po(
  function(owner, box, fields) {
    return po(boxes.get, extend(fields))(owner, box);
  },
  transforms.update,
  db.create
);

/**
 * Delete a box
 *
 * @param {String} username
 * @param {String} box
 * @return {Boolean}
 */

boxes.del = db.del;



/**
 * Utilities
 */

function negativeDate(date) {
  return -new Date(date);
}