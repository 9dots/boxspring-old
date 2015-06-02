var React = require('react');
var mui = require('material-ui');
var Dialog = mui.Dialog;
var TextField = mui.TextField;

var input = {
  display: 'block',
  width: '100%'
};

exports.mixins = [React.addons.LinkedStateMixin];

exports.getInitialState = function() {
  return {
    name: '',
    description: ''
  };
};

exports.render = function() {

  var standardActions = [
    { text: 'Cancel' },
    { text: 'Submit', onClick: this._onDialogSubmit, ref: 'submit' }
  ];


  return (
  <Dialog ref='createBox' title='Create new box' actions={standardActions}>
    <TextField hintText="Box name" floatingLabelText="Name" style={input} 
      valueLink={this.linkState('name')}/>
    <TextField hintText="Describe box" floatingLabelText="Description" style={input}
      valueLink={this.linkState('description')}/>
  </Dialog>
  )
};

exports.show = function() {
  this.refs.createBox.show();
};

exports._onDialogSubmit = function() {
  var self = this;
  console.log('token', localStorage.getItem('userToken'))
  fetch('/api/user/boxes', {
    method: 'POST',
    body: self.state,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    },
  }).then(function() {
    self.refs.createBox.dismiss();
  });
}



module.exports = React.createClass(exports);