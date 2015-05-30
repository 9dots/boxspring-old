var Schema = require('@weo-edu/schema');

// example: google-oauth2|103547991597142817347
var userId = Schema('string')
  .min(21)
  .required(true);

// example: matiasw
var username = Schema('string')
  .pattern(/^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/)
  .required(true);

module.exports = Schema()
  .prop('id', userId)
  .prop('username', username);