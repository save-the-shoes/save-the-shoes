'use strict';

let React = require('react-native');
let TeamTimer = require('./teamtimer.ios.js');

let {
  View,
}  = React;

let MultiTeamTimer = React.createClass({
  render: function() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}} horizontal={true}>
        <TeamTimer teamNumber={1}/>
        <TeamTimer teamNumber={2}/>
        <TeamTimer teamNumber={3}/>
        <TeamTimer teamNumber={4}/>
      </View>
    );
  }
})

module.exports = MultiTeamTimer;