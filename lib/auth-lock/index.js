var config = require('lib/config');
var promisify = require('lib/promisify');

var lock = module.exports = function() {
  var l = new Auth0Lock(config.AUTH0_SECRET, config.AUTH0_DOMAIN);
  l.getToken = function() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  }


  var token = l.getToken();


  if (token) {
    l.profile = promisify(l.getProfile, l)(token);
  }
  return l;
};
