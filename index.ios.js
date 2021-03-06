/* @flow */
'use strict';

import React from 'react';
import {
  AppRegistry,
  PickerIOS,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  PushNotificationIOS
} from 'react-native';

let Moment = require('moment');
let TimerMixin = require('react-native-timer-mixin');
let Sound = require('react-native-sound');
let Device = require('react-native-device-info');
let _ = require('lodash');

let formatTime = require('./common/format-time');
let PRESSURES_AND_MINUTES = require('./timings');

// Play even when silenced
Sound.setCategory('Playback');


let PickerItemIOS = PickerIOS.Item;

let RELIEF_ASSEMBLY_OFFSET = 15;
let RELIEF_IN_OFFSET = 10;
let DUE_OUT_OFFSET = 0;

let TeamTimer = React.createClass({
  mixins: [TimerMixin],

  pressure: function() {
    let pressure = PRESSURES_AND_MINUTES[this.state.barPressure];

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
          {text: 'Yes', onPress: () => this.setState({timerRunning: false, displayTimerScreen: false})},
          {text: 'No'},
          ]);

      return;
    }

    let timeInMinutes = PRESSURES_AND_MINUTES[this.state.barPressure].minutes - 15;
    this.setState({
      timerRunning: !this.state.timerRunning,
      inTime: Moment(),
      displayTimerScreen: true,
      timeRemaining: Moment.duration(timeInMinutes, 'minutes'),
      alarmsRemaining: [
        {alarmSound: `team_${this.props.teamNumber}_relief_assemble.mp3`, offset: RELIEF_ASSEMBLY_OFFSET},
        {alarmSound: `team_${this.props.teamNumber}_relief_in.mp3`, offset: RELIEF_IN_OFFSET},
        {alarmSound: 'alarm.mp3', offset: DUE_OUT_OFFSET}
      ]
    });
  },

  timerScreen: function() {
    this.setState({displayTimerScreen: false});
  },

  decrementTimer: function() {
    if (!this.state.timerRunning) {
      return false;
    }

    this.setState({timeRemaining: this.state.timeRemaining.subtract(1, 'second')});

    if(this.state.inTime != null && this.state.alarmsRemaining.length > 0) {
      var currentAlarm = this.state.alarmsRemaining[0];
      var alarmTime = Moment(this.state.inTime).add(this.pressure().pressureData.minutes - currentAlarm.offset, 'minutes');
      var remainingTime = Moment(alarmTime).diff(Moment(), 'seconds');

      if(remainingTime < 0) {
        this.setState({
          alarmsRemaining: this.state.alarmsRemaining.filter((_, i) => i !== 0)
        })

        const sound = new Sound(currentAlarm.alarmSound, Sound.MAIN_BUNDLE, (err) => {
          sound.play();
        });

        if(currentAlarm.offset == 0){
          // Final alarm (time due out), display popup
          AlertIOS.alert(
            'Beep beep',
            "Crew due out now!"
          );
          this.setState({timerRunning: false});
        }
      }
    }
  },

  getInitialState: function() {
    return {
      barPressure: '150',
      timerRunning: false,
      inTime: null,
      timeRemaining: Moment.duration(0),
      alarmsRemaining: []
    };
  },

  timesRunning: function(pressure) {
    if(this.state.inTime != null){
      var inTime = Moment(this.state.inTime);
      var outTime = Moment(this.state.inTime).add(pressure.minutes, 'minutes');

      var reliefAssemblyTime = Moment(outTime).subtract(RELIEF_ASSEMBLY_OFFSET, 'minutes');
      var reliefInTime = Moment(outTime).subtract(RELIEF_IN_OFFSET, 'minutes');

      var nowTime = Moment();
    }

    return (
      <View>
        <Text style={styles.header}>Team {this.props.teamNumber}</Text>
        <TimeBox time={inTime} always_active={true} title="Crew Entered"></TimeBox>
        <TimeBox time={reliefAssemblyTime} title="Relief Assembly"></TimeBox>
        <TimeBox time={reliefInTime} title="Relief In"></TimeBox>
        <TimeBox time={outTime} title="Time Due Out"></TimeBox>
      </View>
    );
  },

  modeDisplay: function() {
    if(this.state.displayTimerScreen){
      let pressure = this.pressure().pressureData;
      return (
          <View>
          {this.timesRunning(pressure)}
          </View>
          );
    }else{
      return (
        <View>
          <Text style={styles.teamName}>Team {this.props.teamNumber}</Text>
          <Text style={styles.header}>Cylinder Pressure</Text>
          <PickerIOS
            style={styles.pickerIOS}
            selectedValue={this.state.barPressure}
            onValueChange={(barPressure) => this.setState({barPressure})}>
            {Object.keys(PRESSURES_AND_MINUTES).map((barPressure) =>
              <PickerItemIOS
                key={barPressure}
                value={barPressure}
                label={PRESSURES_AND_MINUTES[barPressure].bar.toString()}
              />
            )}
          </PickerIOS>
        </View>
      );
    }
  },

  buttonGoStopBack: function() {
    if(this.state.timerRunning) {
      return (
          <Text style={[styles.button, styles.buttonStop ]} onPress={this.startTimer}>Stop</Text>
          );
    } else if(this.state.displayTimerScreen) {
      return (
          <Text style={[styles.button]} onPress={this.timerScreen}>Back</Text>
          );
    } else {
      return (
          <Text style={[styles.button, styles.buttonGo]} onPress={this.startTimer}>Go</Text>
          );
    }
  },

  render: function() {
    let pressure = this.pressure().pressureData;
    let selectedBar = this.pressure().selectedBar;
    let minutesOfAir = this.pressure().minutesOfAir;

    return (
        <View style={[styles.background, styles.base,]}>
        {this.modeDisplay()}
        <View style={styles.buttonContainer} >
        {this.buttonGoStopBack()}
        </View>
        </View>
        );
  },
});

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
});

let SaveTheShoes = React.createClass({
  render: function() {
    if (Device.isTablet()) {
      return (
        <View style={{flex: 1, flexDirection: 'row'}} horizontal={true}>
          <TeamTimer teamNumber={1}/>
          <TeamTimer teamNumber={2}/>
          <TeamTimer teamNumber={3}/>
          <TeamTimer teamNumber={4}/>
        </View>
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

let styles = ({
  base: {
    paddingTop: 25,
    paddingBottom: 25
  },

  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
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
