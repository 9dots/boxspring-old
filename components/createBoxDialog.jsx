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
  var self = this;

  var standardActions = [
    { text: 'Cancel' },
    { text: 'Submit', onClick: this._onDialogSubmit, ref: 'submit' }
  ];

  function onDismiss() {
    if (self.reject) {
      self.reject();
      self.resolve = null
      self.reject = null;
    }
  }

  return (
  <Dialog ref='createBox' title='Create new box' actions={standardActions} onDismiss={onDismiss}>
    <TextField hintText="Box name" floatingLabelText="Name" style={input} 
      valueLink={this.linkState('name')}/>
    <TextField hintText="Describe box" floatingLabelText="Description" style={input}
      valueLink={this.linkState('description')}/>
  </Dialog>
  )
};

exports.show = function() {
  var self = this;
  self.refs.createBox.show();
  var promise = new Promise(function(resolve, reject) {
    self.resolve = resolve;
    self.reject = reject;
  });
  return promise;
};

exports._onDialogSubmit = function() {
  var self = this;
  fetch('/api/user/boxes', {
    method: 'POST',
    body: JSON.stringify(self.state),
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(function() {
    if (self.resolve) {
      self.resolve();
      self.resolve = null;
      self.reject = null;
    }
    self.refs.createBox.dismiss();
  });
}




module.exports = React.createClass(exports);