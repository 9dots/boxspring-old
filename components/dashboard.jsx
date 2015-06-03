var React = require('react');
var mui = require('material-ui');
var AppBar = mui.AppBar;
var LinearProgress = mui.LinearProgress;
var FloatingActionButton = mui.FloatingActionButton;
var FontIcon = mui.FontIcon;
var Paper = mui.Paper;

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

var container = {
  margin: '0 auto',
  maxWidth: '960px'
};

exports.name = 'Dashboard';

exports.getInitialState = function() {
  return {
    profile: null,
    boxes: []
  }
};

exports.componentDidMount = function() {
  var self = this;
  // In this case, we receive lock and the token from the parent component
  // If you hav them locally, just use `this.lock` and `this.idToken`
  self.props.lock.getProfile(this.props.idToken, function (err, profile) {
    if (err) {
      console.log("Error loading the Profile", err);
      return;
    }
    self.setState({profile: profile});
    self.getBoxes(profile);
  });

  

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

  var boxNodes = this.state.boxes.map(function(box) {
    return (
      <Paper key={box.id}>
        <h3>{box.name}</h3>
        <p>{box.description}</p>
      </Paper>
    )
  });


  return (
    <span>
      <AppBar title={this.state.profile.name}/>
      <div style={container}>
        {boxNodes}
      </div>
      <FloatingActionButton style={createButton} onClick={this.createBox}>
        <i className="material-icons" style={icon}>add</i>
      </FloatingActionButton>
      <CreateBoxDialog ref='createBox'/>
    </span>

  );
  
};


exports.getBoxes = function(profile) {
  var self = this;

  profile = profile || self.state.profile;
  console.log('profile', profile);
  if(!profile) return;

  fetch('/api/users/' + profile.nickname + '/boxes', {
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(res) {
    return res.json();
  }).then(function(boxes) {
    self.setState({boxes: boxes});
  })
};

exports.createBox = function() {
  var self = this;
  self.refs.createBox.show().then(function() {
    console.log('get boxes');
    self.getBoxes();
  }).catch(function() {
    console.log('error');
  })
}


module.exports = React.createClass(exports);