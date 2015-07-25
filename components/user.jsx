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

var paper = {
  padding: '15px 30px',
  marginBottom: '20px',
  marginTop: '20px'
};

var link = {
  textDecoration: 'none'
};

exports.name = 'Dashboard';

exports.contextTypes = {
  router: React.PropTypes.func
};

exports.getInitialState = function() {
  return {
    boxes: []
  }
};

exports.componentDidMount = function() {
  var self = this;
  var username = this.context.router.getCurrentParams().username
  this.getBoxes(username);
};

exports.render = function() {
  var boxNodes = this.state.boxes.map(function(box) {
    return (
      <Paper key={box.id}>
        <div style={paper}>
          <a href={box.fullName} style={link}><h3>{box.name}</h3></a>
          <p>{box.description}</p>
        </div>
      </Paper>
    )
  });


  return (
    <span>
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


exports.getBoxes = function(username) {
  var self = this;

  fetch('/api/users/' + username + '/boxes', {
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
    self.getBoxes();
  });
}


module.exports = React.createClass(exports);