var React = require('react');

var App = require('components/app.jsx');

document.addEventListener("DOMContentLoaded", function(event) { 
  React.render(<App/>, document.getElementById('app'));
});

