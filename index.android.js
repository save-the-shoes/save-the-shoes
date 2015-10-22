'use strict';

var React = require('react-native');
var Dropdown = require('react-native-dropdown-android');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var PRESSURES_AND_MINUTES = {
  '300': {
    bar: 300,
    minutes: 51,
  },
  '290': {
    bar: 290,
    minutes: 49,
  },
  '280': {
    bar: 280,
    minutes: 47,
  },
  '270': {
    bar: 270,
    minutes: 45,
  },
  '260': {
    bar: 260,
    minutes: 44,
  },
  '250': {
    bar: 250,
    minutes: 42,
  },
  '240': {
    bar: 240,
    minutes: 40,
  },
  '230': {
    bar: 230,
    minutes: 38,
  },
  '220': {
    bar: 220,
    minutes: 36,
  },
  '210': {
    bar: 210,
    minutes: 34,
  },
  '200': {
    bar: 200,
    minutes: 33,
  },
  '190': {
    bar: 190,
    minutes: 31,
  },
  '180': {
    bar: 180,
    minutes: 29,
  },
  '170': {
    bar: 170,
    minutes: 27,
  },
  '160': {
    bar: 160,
    minutes: 25,
  },
  '150': {
    bar: 150,
    minutes: 23,
  },
  '140': {
    bar: 140,
    minutes: 21,
  },
  '130': {
    bar: 130,
    minutes: 19,
  },
  '120': {
    bar: 120,
    minutes: 17,
  },
  '110': {
    bar: 110,
    minutes: 15,
  },
};

var SaveTheShoes = React.createClass({
  modeDisplay: function() {
    return(
      <View>
        <Text style={styles.welcome}>
          Select Cylinder Pressure
        </Text>
        <Dropdown
          style={{ height: 20, width: 200 }}
          values={[100, 110, 120]} selected={1} />
      </View>
    );
  },

  render: function() {
    return (
      <View>
        {this.modeDisplay()}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SaveTheShoes', () => SaveTheShoes);
