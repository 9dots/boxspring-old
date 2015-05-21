var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <script src="//cdn.auth0.com/js/lock-7.1.min.js"></script>
          <script type="text/javascript" src="/static/build.js"></script>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    );
  }
});