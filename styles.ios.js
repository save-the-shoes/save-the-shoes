'use strict';

let React = require('react-native');

let {
  StyleSheet,
}  = React;

let styles = StyleSheet.create({
  base: {
    paddingTop: 25,
    paddingBottom: 25
  },

  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
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
})

module.exports = styles;