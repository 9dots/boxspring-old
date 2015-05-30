var Schema = require('@weo-edu/schema');

var box = require('./box').pick('id', 'fullName', 'displayName').required(true);

var type = Schema('string').enum(['file']).required(true);

var module.exports = Schema()
  .prop('type', type)
  .prop('box', box)
  .prop('path', {type: 'string', required: true})
  .prop('fullPath', {type: 'string', required: true})
  .prop('createdAt', {type: 'string', format: 'date-time', required: true})
  .prop('contentUrl', {type: 'string', format: 'uri', required: true})  

