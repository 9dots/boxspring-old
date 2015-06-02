var Schema = require('@weo-edu/schema');

module.exports = Schema('string')
  .pattern(/^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/);