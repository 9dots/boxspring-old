/**
 * Modules
 */

var React = require('react');
var mui = require('material-ui');
var Router = require('react-router');

require("react-tap-event-plugin")();

/**
 * Pollyfills
 */

require('whatwg-fetch');
require('es6-promise').polyfill();

/**
 * Libs
 */

var lock = require('lib/auth-lock');

/**
 * App Setup
 */

var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);


/**
 * Components
 */

var Title = require('./title.jsx');

var AppBar = mui.AppBar;
var LinearProgress = mui.LinearProgress;
var RouteHandler = Router.RouteHandler;
var lock = lock();

/**
 * App
 */

exports.name = 'App';

exports.mixins = [Router.Navigation];

exports.childContextTypes = {
  muiTheme: React.PropTypes.object,
  profile: React.PropTypes.object,
  lock: React.PropTypes.object
};

exports.getChildContext = function() {
  return {
    muiTheme: ThemeManager.getCurrentTheme(),
    profile: this.state.profile,
    lock: lock
  };
};

exports.getInitialState = function() {
  return {
    profile: null
  };
};

exports.componentWillMount = function() {
  var self = this;
  lock.profile && lock.profile.then(function(profile) {
    self.setState({profile: profile});
    console.log('profile', profile);
    self.transitionTo('user', {username: profile.nickname})
  });
};

exports.render = function() {
  var async;
  if (this.state.asyncAction)
    async = <LinearProgress mode="indeterminate"  />

  return (
    <span>
      <AppBar title={<Title/>}/>
      {async}
      <RouteHandler/>
    </span>
  );
};

module.exports = React.createClass(exports);
