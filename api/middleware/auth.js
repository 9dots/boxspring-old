var jwt = require('express-jwt');

var compose = require('lib/mw-compose');

var jwtCheck = jwt({
  secret: new Buffer('Dfpje89kS7pq5CE7dYpf8_tvjTNIrIU4Yu9wx3sRB6TRMVr9gLipFDx_Z4TyKaEa', 'base64'),
  audience: 'sYkFyv2qKjEMe2W2OugZ5JiHUju296kL'
});


exports.user = compose(
  jwtCheck,
  function(req, res, next) {
    console.log('user', req.user);
    req.user = {id: req.user.user_id, username: req.user.nickname};
    req.owner = req.user.username;
    req.username = req.owner;
    req.params.user = req.user;
    req.params.owner = req.owner;
    req.params.username = req.username;
    next();
  }
);