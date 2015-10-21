/* @flow */
'use strict';

var React = require('react-native');
var Moment = require('moment');
var TimerMixin = require('react-native-timer-mixin');
var AudioPlayer = require('react-native-audioplayer');
var _ = require('lodash');

var formatTime = require('./common/format-time');

var {
  AppRegistry,
  PickerIOS,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  PushNotificationIOS
} = React;


var PickerItemIOS = PickerIOS.Item;

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
  mixins: [TimerMixin],

  pressure: function() {
    var pressure = PRESSURES_AND_MINUTES[this.state.barPressure];

    return {
      pressureData: pressure,
      selectedBar: pressure.bar,
      minutesOfAir: pressure.minutes
    };
  },

  componentDidMount () {
    this.setInterval(this.decrementTimer, 1000);
  },

  startTimer: function () {
    if (this.state.timerRunning) {
      AlertIOS.alert(
          'Stop the timer?',
          'Are you sure you want to stop the timer?', [
          {text: 'Yes', onPress: () => this.setState({timerRunning: false})},
          {text: 'No'},
          ]);

      return;
    }

    this.setState({timerRunning: !this.state.timerRunning, inTime: Moment()});

    // TODO make a timer for each stage (- 15 for RA time currently)
    var timeInMinutes = PRESSURES_AND_MINUTES[this.state.barPressure].minutes - 15;
    this.setState({timeRemaining: Moment.duration(timeInMinutes, 'minutes')});
  },

  decrementTimer: function() {
    if (!this.state.timerRunning) {
      return false;
    }

    // TODO - deltatime
    this.setState({timeRemaining: this.state.timeRemaining.subtract(1, 'second')});

    if (this.state.timeRemaining <= 0) {
      AudioPlayer.play('alarm.mp3');

      AlertIOS.alert(
        'Beep beep',
        "Time for relief assembly!"
      );

      this.setState({timerRunning: false});
    }
  },

  getInitialState: function() {
    return {
      barPressure: '110',
      timerRunning: false,
      inTime: null,
      timeRemaining: Moment.duration(0)
    };
  },

  timesRunning: function(pressure) {
    if(this.state.inTime != null){
      var inTime = Moment(this.state.inTime);
      var outTime = Moment(this.state.inTime).add(pressure.minutes, 'minutes');

      var reliefAssemblyTime = Moment(outTime).subtract(15, 'minutes');
      var reliefInTime = Moment(outTime).subtract(10, 'minutes');
    }

    if(this.state.timerRunning) {
      return (
          <View>
          <TimeBox time={inTime} title="Crew Entered at"></TimeBox>
          <TimeBox time={reliefAssemblyTime} title="Relief Assembly"></TimeBox>
          <TimeBox time={reliefInTime} title="Relief In"></TimeBox>
          <TimeBox time={outTime} title="Time Due Out"></TimeBox>
          </View>
          );
    }
  },

  modeDisplay: function() {
    if(this.state.timerRunning){
      var pressure = this.pressure().pressureData;
      return (
          <View>
          <CountDownBox time={this.state.timeRemaining}></CountDownBox>
          {this.timesRunning(pressure)}
          </View>
          );
    }else{
      return (
          <View>
          <Text style={styles.header}>Select Cylinder Pressure</Text>
          <PickerIOS
          style={styles.pickerIOS}
          selectedValue={this.state.barPressure}
          onValueChange={(barPressure) => this.setState({barPressure})}>
          {Object.keys(PRESSURES_AND_MINUTES).map((barPressure) => (
                <PickerItemIOS
                key={barPressure}
                value={barPressure}
                label={PRESSURES_AND_MINUTES[barPressure].bar.toString()}
                />
                )
              )}
          </PickerIOS>
          </View>
          );
    }
  },

  buttonGoStop: function() {
    if(this.state.timerRunning) {
      return (
          <Text style={[styles.button, styles.buttonStop ]} onPress={this.startTimer}>Stop</Text>
          );
    } else {
      return (
          <Text style={[styles.button, styles.buttonGo]} onPress={this.startTimer}>Go</Text>
          );
    }
  },

  render: function() {
    var pressure = this.pressure().pressureData;
    var selectedBar = this.pressure().selectedBar;
    var minutesOfAir = this.pressure().minutesOfAir;

    return (
        <View style={[styles.background, styles.base,]}>
        {this.modeDisplay()}
        <View style={styles.buttonContainer} >
        {this.buttonGoStop()}
        </View>
        </View>
        );
  },
});

var TimeBox = React.createClass({
  render: function() {
    return (
      <View style={{borderTopWidth: 1, borderTopColor: '#C2C2D6', padding: 10}}>
        <View><Text style={{textAlign: 'center'}}>{this.props.title}</Text></View>
        <View><Text style={{textAlign: 'center', fontSize: 24}}>{formatTime(Moment().diff(this.props.time, 'seconds'))}</Text></View>
      </View>
    );
  }
});

var CountDownBox = React.createClass({
  render: function() {
    return (
        <View style={{borderTopWidth: 1, borderTopColor: '#C2C2D6', padding: 10}}>
        <View><Text style={{textAlign: 'center'}}>Time Remaining</Text></View>
        <View><Text style={{textAlign: 'center', fontSize: 34}}>{this.props.time.minutes()}′{this.props.time.seconds()}′′</Text></View>
        </View>
        );
  }
});

AppRegistry.registerComponent('SaveTheShoes', () => SaveTheShoes);
AppRegistry.registerComponent('TimeBox', () => TimeBox);
AppRegistry.registerComponent('CountDownBox', () => CountDownBox);

var styles = ({
  base: {
    paddingTop: 25,
    paddingBottom: 25
  },

  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },

  pickerIOS: {
  },

  background: {
    backgroundColor: '#EFEFEF',
    flex: 1
  },

  button: {
    color: '#FFFFFF',
    backgroundColor: '#007AFF',
    padding: 20,
    width: 200,
    textAlign: 'center',
    fontSize: 18,
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
