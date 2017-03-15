'use strict';

let React = require('react-native');
let Moment = require('moment');
let TimerMixin = require('react-native-timer-mixin');
let Dropdown = require('react-native-dropdown-android');
let formatTime = require('./common/format-time');
let AudioPlayer = require('react-native-audioplayer');
let PRESSURES_AND_MINUTES = require('./timings');

let {
  AppRegistry,
  BackAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} = React;


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

      ToastAndroid.show('Timer stopped', ToastAndroid.LONG);

      return;
    }

    this.setState({timerRunning: !this.state.timerRunning, inTime: Moment()});

    this.setState({displayTimerScreen: true});

    let timeInMinutes = PRESSURES_AND_MINUTES[this.state.barPressure].minutes - 15;
    this.setState({timeRemaining: Moment.duration(timeInMinutes, 'minutes')});

    ToastAndroid.show('Pressure of ' + this.state.barPressure + ' bar selected', ToastAndroid.LONG);
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
        <View style={styles.timerScreen}>
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
    paddingTop: 20,
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
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#999999'
  },
  timerScreen: {
    paddingTop: 20
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
