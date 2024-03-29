module.exports = function(schema, prop) {
  prop = prop || 'body';
  return function(req, res, next) {
    console.log('schema', schema.toJSON(), req[prop]);
    var msg = schema.validate(req[prop]);
    if (! msg.valid)
      res.status(422).json(msg);
    else
      next();
  }
};