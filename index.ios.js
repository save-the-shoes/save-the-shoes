/* @flow */
'use strict';

let React = require('react-native');
let Device = require('react-native-device');
let _ = require('lodash');

let TeamTimer = require('./teamtimer.ios.js');
let MultiTeamTimer = require('./multiteamtimer.ios.js');

let {
  AppRegistry,
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

let styles = ({
  base: {
    paddingTop: 25,
    paddingBottom: 25
  },

  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },

  teamName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },

  pickerIOS: {
  },

  background: {
    backgroundColor: '#EFEFEF',
    flex: 1,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    padding: 6
  },

  button: {
    color: '#FFFFFF',
    backgroundColor: '#007AFF',
    padding: 20,
    width: 200,
    textAlign: 'center',
    fontSize: 30,
  },

  buttonGo: {
    backgroundColor: '#009933',
  },

  buttonStop: {
    backgroundColor: '#E60000',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('SaveTheShoes', () => SaveTheShoes);
AppRegistry.registerComponent('TimeBox', () => TimeBox);
AppRegistry.registerComponent('TeamTimer', () => TeamTimer);
