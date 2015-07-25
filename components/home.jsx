var React = require('react');

exports.displayName = 'Home'

exports.contextTypes = {
  lock: React.PropTypes.object
}

exports.showLock = function() {
  this.context.lock.show({authParams: {scope: 'openid profile'}});
};

exports.render = function() {
  return (
  <div className="login-box">
    <a onClick={this.showLock}>Sign In</a>
  </div>
  )
};


module.exports = React.createClass(exports);
