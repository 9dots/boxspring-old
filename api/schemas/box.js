var Schema = require('@weo-edu/schema');

var User = require('./user');

var type = Schema('string').enum(['box']).required(true);

module.exports = Schema()
  .prop('id', {type: 'string', required: true})
  .prop('type', type)
  .prop('owner', User.required(true))
  .prop('name', {type: 'string', required: true})
  .prop('fullName', {type: 'string', required: true})
  .prop('displayName', {type: 'string', required: true})
  .prop('createdAt', {type: 'string', format: 'date-time', required: true})
  .prop('updatedAt', {type: 'string', format: 'date-time', required: true})