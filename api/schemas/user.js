var Schema = require('@weo-edu/schema');

var slug = require('./slug');

// example: google-oauth2|103547991597142817347
var userId = Schema('string')
  .min(21)
  .required(true);

module.exports = Schema()
  .prop('id', userId)
  .prop('username', slug.required(true));