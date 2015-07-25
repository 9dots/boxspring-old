var React = require('react');
var ace = require('brace');

require('brace/mode/javascript');
require('brace/theme/monokai');

var FileManager = require('./fileManager.jsx');

var style = {
  width: '800px',
  height: '800px'
};

var container = {
  display: 'flex'
};

exports.render = function() {
  return (
    <div style={container}>
      <FileManager/>
      <div id='javascript-editor' style={style}></div>
    </div>
  )
};

exports.componentDidMount = function() {
  console.log('did mount');
  var editor = ace.edit('javascript-editor');
  editor.getSession().setMode('ace/mode/javascript');
  editor.setTheme('ace/theme/monokai');
};



module.exports = React.createClass(exports);