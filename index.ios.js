/* @flow */
'use strict';

let React = require('react-native');
let Device = require('react-native-device');
let _ = require('lodash');

let TeamTimer = require('./teamtimer.ios.js');
let MultiTeamTimer = require('./multiteamtimer.ios.js');

let {
  AppRegistry,
  StyleSheet,
} = React;

let SaveTheShoes = React.createClass({
  render: function() {
    if (Device.isIpad()) {
      return (
        <MultiTeamTimer />
      );
    } else {
      return (
        <TeamTimer teamNumber={1}/>
      );
    }
  }
});

AppRegistry.registerComponent('SaveTheShoes', () => SaveTheShoes);
AppRegistry.registerComponent('TimeBox', () => TimeBox);
AppRegistry.registerComponent('TeamTimer', () => TeamTimer);
