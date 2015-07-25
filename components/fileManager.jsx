var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;

var input = {
  display: 'block',
  width: '100%'
};

exports.render = function() {
  return (
    <div>
      <TextField style={input}/>
    </div>
  )
};

module.exports = React.createClass(exports);