var React = require('react');
var mui = require('material-ui');
var AppBar = mui.AppBar;
var LinearProgress = mui.LinearProgress;
var FloatingActionButton = mui.FloatingActionButton;
var FontIcon = mui.FontIcon;

var CreateBoxDialog = require('./createBoxDialog.jsx');

var createButton = {
  position: 'fixed',
  right: '100px',
  bottom: '40px'
};

var icon = {
  lineHeight: '56px',
  fontSize: '30px',
  color: 'white'
};



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
  if (!this.state.profile) {
    return (
      <span>
        <AppBar/>
        <LinearProgress mode="indeterminate"  />
      </span>
    );
  }



  return (
    <span>
      <AppBar title={this.state.profile.name}/>
      <FloatingActionButton style={createButton} onClick={this.createBox}>
        <i className="material-icons" style={icon}>add</i>
      </FloatingActionButton>
      <CreateBoxDialog ref='createBox'/>
    </span>

  );
  
};


exports.createBox = function() {
  this.refs.createBox.show();
}


module.exports = React.createClass(exports);