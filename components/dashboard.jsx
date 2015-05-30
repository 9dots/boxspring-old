var React = require('react');

exports.getInitialState = function() {
  return {
    profile: null
  }
};

exports.componentDidMount = function() {
  // In this case, we receive lock and the token from the parent component
  // If you hav them locally, just use `this.lock` and `this.idToken`
  this.props.lock.getProfile(this.props.idToken, function (err, profile) {
    if (err) {
      console.log("Error loading the Profile", err);
      return;
    }
    this.setState({profile: profile});
  }.bind(this));
};

exports.render = function() {
  console.log('profile', this.state.profile);
  if (this.state.profile) {
    return (
      <h2>Welcome {this.state.profile.name}</h2>
    );
  } else {
    return (
      <div className="loading">Loading profile</div>
    );
  }
};


module.exports = React.createClass(exports);