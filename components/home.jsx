var React = require('react');

exports.showLock = function() {
  this.props.lock.show({authParams: {scope: 'openid profile'}});
};

exports.render = function() {
  return (
  <div className="login-box">
    <a onClick={this.showLock}>Sign In</a>
  </div>
  )
};


module.exports = React.createClass(exports);