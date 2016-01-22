'use strict';

let React = require('react-native');
let Moment = require('moment');
let formatTime = require('./common/format-time');
let styles = require('./styles.ios.js');

let {
  View,
  Text,
} = React;

let TimeBox = React.createClass({
  render: function() {
    let inactiveStyle = {}
    if(this.props.time < Moment() && !this.props.always_active) {
      inactiveStyle.color = '#A6A6A6';
    }

    return (
      <View style={{borderTopWidth: 1, borderTopColor: '#C2C2D6', padding: 10}}>
        <View>
          <Text style={[inactiveStyle, {textAlign: 'center', fontSize: 24}]}>{`${this.props.title} @ ${this.props.time.format('HH:mm')}`}</Text>
        </View>

        <View>
          <Text style={[inactiveStyle, {textAlign: 'center', fontSize: 42}]}>{formatTime(Moment().diff(this.props.time, 'seconds'))}</Text>
        </View>
      </View>
    );
  }
})

module.exports = TimeBox;
