var React = require('React');
var App = require('components/hello-world.jsx');

document.addEventListener("DOMContentLoaded", function(event) { 
  React.render(<App/>, document.getElementById('app'));
});

