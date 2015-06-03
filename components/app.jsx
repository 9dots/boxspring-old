/**
 * Modules
 */

var React = require('react');
var mui = require('material-ui');

require("react-tap-event-plugin")();

/**
 * Pollyfills
 */

require('whatwg-fetch');
require('es6-promise').polyfill();

/**
 * Components
 */

var Home = require('./home.jsx');
var Dashboard = require('./dashboard.jsx');

/**
 * App Setup
 */

var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);


/**
 * App
 */

exports.name = 'App';

exports.childContextTypes = {
  muiTheme: React.PropTypes.object
};

exports.getChildContext = function() {
  return {
    muiTheme: ThemeManager.getCurrentTheme()
  };
};

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
