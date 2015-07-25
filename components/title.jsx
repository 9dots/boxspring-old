var React = require('react');

var mui = require('material-ui')
var Typography = mui.Styles.Typography;

exports.name = 'Title';

exports.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
};

exports.render = function() {
  var path = this.context.router.getCurrentPath();
  var ps = path.split('/');
  var user = ps[1];
  var box = ps[2];
  var link = '/' + user;
  var boxLink = '/' + user + '/' + box;
  var styles = this.getStyles();

  var boxPath;
  if (box) {
    boxPath = (
      <span> / <a href={boxLink} style={styles.link}>{box}</a>{boxPath}</span>
    );
  }

  var path = (
    <span>/ <a href={link} style={styles.link}>{user}</a>{boxPath}</span>
  );

  return (
    <h1 style={styles.title}>{path}</h1>
  );
}

exports.getStyles = function() {
  var themeVariables = this.context.muiTheme.component.appBar;
  return {
    title: {
      float: 'left',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: Typography.fontWeightNormal,
      color: themeVariables.textColor,
      lineHeight: themeVariables.height + 'px'
    },
    link: {
      color: themeVariables.textColor,
      textDecoration: 'none'
    }
  }
}

module.exports = React.createClass(exports);

