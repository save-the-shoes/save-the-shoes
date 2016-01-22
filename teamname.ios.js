'use strict';

let React = require('react-native');
let styles = require('./styles.ios.js');

let {
  View,
  Text,
}  = React;

let TeamName = React.createClass({
  render: function() {
    return (
      <Text style={styles.teamName}>Team {this.props.teamNumber}</Text>
    );
  }
})

module.exports = TeamName;