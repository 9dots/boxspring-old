var Home = require('./home.jsx');
var Dashboard = require('./dashboard.jsx');
var React = require('react');

exports.componentWillMount = function() {
  this.lock = new Auth0Lock('sYkFyv2qKjEMe2W2OugZ5JiHUju296kL', 'boxspring.auth0.com');
  this.setState({idToken: this.getIdToken()});
};

exports.render = function() {
  var idToken = this.state.idToken;
  if (!idToken) {
    return (
    <Home lock={this.lock} />
    )
  } else {
    return (
    <Dashboard lock={this.lock} idToken={idToken}/>
    )
  }
  
};


exports.getIdToken = function() {
  var idToken = localStorage.getItem('userToken');
  var authHash = this.lock.parseHash(window.location.hash);
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



module.exports = React.createClass(exports);
