
var po = require('@weo-edu/po');

var R = require('ramda');

var extend = R.merge(R.__);


var files = exports;


/**
 * Create a file
 * 
 * @param  {Object} box
 * @param  {Object} file
 * @return {Boolean} 
 */

files.create = po(
  transforms.create,
  db.create
);

/**
 * Get a file
 *
 * @param {String} owner 
 * @param {String} box
 * @param {String} path
 * @return {Object}
 */

files.get = db.get;

/**
 * List files
 *
 * @param {String} owner
 * @param {String} box
 * @return {Array} Array of files.
 */

files.list = d.list;


/**
 * Update a file
 * 
 * @param  {String} owner
 * @param  {String} box
 * @param  {String} path
 * @param  {Object} fields
 * @return {Boolean}
 */

files.update = po(
  function(owner, box, path, fields) {
    return po(files.get, extend(fields))(owner, box, path);
  },
  transforms.update,
  db.create
);

/**
 * Delete a file
 *
 * @param {String} owner
 * @param {String} box
 * @param {String} path
 * @return {Boolean}
 */

files.del = db.del


/**
 * Update a file path
 *
 * @param {String} owner
 * @param {String} box
 * @param {String} path
 * @param {String} new_path
 * @return {Boolean} 
 */

files.updatePath = function(owner, box, path, new_path) {
  return po(
    files.get,
    files.create(owner, box, new_path),
    po.wrap(files.del)(owner, box, path)
  )(owner, box, path);
}

