var validator = require('@weo-edu/validate');
var Schema = require('@weo-edu/schema');
var R = require('ramda');

Schema.use(R.curry(validator)(R.__, {greedy: true}));


exports.box = require('./box');
