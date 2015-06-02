var Schema = require('@weo-edu/schema');

var user = require('./user');
var slug = require('./slug');

var type = Schema('string').enum(['box']).required(true);


module.exports = Schema()
  .prop('id', {type: 'string', required: true})
  .prop('type', type)
  .prop('owner', user.required(true))
  .prop('name', slug.required(true))
  .prop('fullName', {type: 'string', required: true})
  .prop('description', {type: 'string'})
  .prop('createdAt', {type: 'string', format: 'date-time', required: true})
  .prop('updatedAt', {type: 'string', format: 'date-time', required: true})