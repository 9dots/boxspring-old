var validate = require('lib/mw-validate');

var models = require('../models');
var schemas = require('../schemas');


exports.validateSet = validate(schemas.file.pick('path').others(false));