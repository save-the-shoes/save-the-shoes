'use strict';

let React = require('react-native');
let Moment = require('moment');
let TimerMixin = require('react-native-timer-mixin');
let Dropdown = require('react-native-dropdown-android');
let formatTime = require('./common/format-time');
let AudioPlayer = require('react-native-audioplayer');

let {
  AppRegistry,
  BackAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} = React;

let PRESSURES_AND_MINUTES = {
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

let SaveTheShoes = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      barPressure: 110
    };
  },

  pressure: function() {
    var pressure = PRESSURES_AND_MINUTES[this.state.barPressure];

    return {
      pressureData: pressure,
      selectedBar: pressure.bar,
      minutesOfAir: pressure.minutes
    };
  },

  componentDidMount: function() {
    this.setInterval(this.decrementTimer, 1000);
  },

  startTimer: function() {
    if (this.state.timerRunning) {
      this.setState({timerRunning: false});

      //TODO Need to get an alert dialog working here

      return;
    }

    this.setState({timerRunning: !this.state.timerRunning, inTime: Moment()});

    this.setState({displayTimerScreen: true});

    let timeInMinutes = PRESSURES_AND_MINUTES[this.state.barPressure].minutes - 15;
    this.setState({timeRemaining: Moment.duration(timeInMinutes, 'minutes')});

    ToastAndroid.show('Pressure of ' + this.state.barPressure + ' bar selected', ToastAndroid.LONG)
  },

  decrementTimer: function() {
    if (!this.state.timerRunning) {
      return false;
    }

    this.setState({timeRemaining: this.state.timeRemaining.subtract(1, 'second')});

    if(this.state.timeRemaining <= 0) {
      AudioPlayer.play('alarm');

      this.setState({timerRunning: false});
    }
  },

  updateBarPressure: function(data) {
    this.setState({barPressure: data.value});
  },

  timesRunning: function(pressure) {
    if(this.state.inTime != null) {
      var inTime = Moment(this.state.inTime);
      var outTime = Moment(this.state.inTime).add(pressure.minutes, 'minutes');

      var reliefAssemblyTime = Moment(outTime).subtract(15, 'minutes');
      var reliefInTime = Moment(outTime).subtract(10, 'minutes');
    }

    return (
      <View>
        <TimeBox time={inTime} title="Crew Entered"></TimeBox>
        <TimeBox time={reliefAssemblyTime} title="Relief Assembly"></TimeBox>
        <TimeBox time={reliefInTime} title="Relief In"></TimeBox>
        <TimeBox time={outTime} title="Time Due Out"></TimeBox>
      </View>
    );
  },

  backFromTimerScreen: function() {
    this.setState({displayTimerScreen: false});
    this.setState({barPressure: 110});
  },

  modeDisplay: function() {
    if(this.state.displayTimerScreen){
      let pressure = this.pressure().pressureData;

      return (
        <View>
          {this.timesRunning(pressure)}
        </View>
      );
    } else {
      return(
        <View style={styles.container}>
          <Text style={styles.header}>
            Select Cylinder Pressure
          </Text>
          <Dropdown
            style={styles.dropdown}
            values={Object.keys(PRESSURES_AND_MINUTES)} selected={0}
            onChange={this.updateBarPressure}
          />
        </View>
      );
    }
  },

  // TODO - BackAndroid doesn't seem to be getting triggered at the moment
  androidBack: function() {
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if(this.state.displayTimerScreen) {
        this.goBack();
        return true;
      }
      return false;
    });
  },

  buttonGoStopBack: function() {
    if(this.state.timerRunning) {
      return (
        <Text style={styles.button} onPress={this.startTimer}>Stop</Text>
      );
    } else if(this.state.displayTimerScreen) {
      return (
        <Text style={styles.button} onPress={this.backFromTimerScreen}>Back</Text>
      );
    } else {
      return (
        <Text style={styles.button} onPress={this.startTimer}>Go</Text>
      );
    }
  },

  render: function() {
    return (
      <View>
        {this.modeDisplay()}
        {this.buttonGoStopBack()}
      </View>
    );
  }
});

var TimeBox = React.createClass({
  render: function() {
    return (
      <View>
        <Text style={styles.timerHeading}>
          {`${this.props.title} @ ${this.props.time.format('HH:mm')}`}
        </Text>
        <Text style={styles.timerCountdown}>
          {formatTime(Moment().diff(this.props.time, 'seconds'))}
        </Text>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  dropdown: {
    height: 20,
    width: 200,
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#888888'
  },
  timerHeading: {
    fontSize: 16,
    textAlign: 'center'
  },
  timerCountdown: {
    fontSize: 30,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('SaveTheShoes', () => SaveTheShoes);
AppRegistry.registerComponent('TimeBox', () => TimeBox);
