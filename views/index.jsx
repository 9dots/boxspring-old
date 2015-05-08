var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <script type="text/javascript" src="/static/build.js"></script>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    );
  }
});