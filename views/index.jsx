var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <style>{"body { margin: 0;}"}</style>
          <script src="//cdn.auth0.com/js/lock-7.1.min.js"></script>
          <script type="text/javascript" src="/static/build.js"></script>
          <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'></link>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    );
  }
});