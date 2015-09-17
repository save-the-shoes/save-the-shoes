'use strict';

var React = require('react-native');
var Moment = require('moment');

var {
  AppRegistry,
  PickerIOS,
  Text,
  View,
  TouchableHighlight,
  AlertIOS
} = React;


var PickerItemIOS = PickerIOS.Item;

var PRESSURES_AND_MINUTES = {
  '300': {
    bar: '300',
    minutes: '51',
  },
  '290': {
    bar: '290',
    minutes: '49',
  },
  '280': {
    bar: '280',
    minutes: '47',
  },
  '270': {
    bar: '270',
    minutes: '45',
  },
  '260': {
    bar: '260',
    minutes: '44',
  },
  '250': {
    bar: '250',
    minutes: '42',
  },
  '240': {
    bar: '240',
    minutes: '40',
  },
  '230': {
    bar: '230',
    minutes: '38',
  },
  '220': {
    bar: '220',
    minutes: '36',
  },
  '210': {
    bar: '210',
    minutes: '34',
  },
  '200': {
    bar: '200',
    minutes: '33',
  },
  '190': {
    bar: '190',
    minutes: '31',
  },
  '180': {
    bar: '180',
    minutes: '29',
  },
  '170': {
    bar: '170',
    minutes: '27',
  },
  '160': {
    bar: '160',
    minutes: '25',
  },
  '150': {
    bar: '150',
    minutes: '23',
  },
  '140': {
    bar: '140',
    minutes: '21',
  },
  '130': {
    bar: '130',
    minutes: '19',
  },
  '120': {
    bar: '120',
    minutes: '17',
  },
  '110': {
    bar: '110',
    minutes: '15',
  },
};

var SaveTheShoes = React.createClass({
  startTimer: function () {
    if (this.state.timerRunning) {
     AlertIOS.alert(
      'Stop the timer?',
      'Are you sure you want to stop the timer?', [
        {text: 'Yes', onPress: () => this.setState({timerRunning: false})},
        {text: 'No', onPress: () => this.setState({timerRunning: true})},
      ])

       return;
    }

    this.setState({timerRunning: true, inTime: Moment()});
  },

  getInitialState: function() {
    return {
      barPressure: '110',
      minutes: 15,
      timerRunning: false,
      inTime: Moment()
    };
  },

  render: function() {
    var pressure = PRESSURES_AND_MINUTES[this.state.barPressure];
    var selectionString = pressure.bar + ' bar which is about ' + pressure.minutes + ' minutes of air. ';

    var inTime = Moment(this.state.inTime); //.format('MMMM Do YYYY, h:mm:ss a');
    var outTime = Moment(this.state.inTime).add(pressure.minutes, 'minutes');

    var reliefAssemblyTime = Moment(outTime).subtract(15, 'minutes');
    var reliefInTime = Moment(outTime).subtract(10, 'minutes');

    return (
      <View style={[styles.background, styles.base]}>
        <Text></Text>
        <Text>Enter Cylinder Pressure: </Text>
        <PickerIOS
          selectedValue={this.state.barPressure}
          onValueChange={(barPressure) => this.setState({barPressure})}>
          {Object.keys(PRESSURES_AND_MINUTES).map((barPressure) => (
            <PickerItemIOS
              key={barPressure}
              value={barPressure}
              label={PRESSURES_AND_MINUTES[barPressure].bar}
              />
            )
          )}
        </PickerIOS>
        <Text>You selected: {selectionString}</Text>
        <Text>Time in: {inTime.format('HH:mm')}</Text>
        <Text>Relief Assembly: {reliefAssemblyTime.format('HH:mm')}</Text>
        <Text>Relief In: {reliefInTime.format('HH:mm')}</Text>
        <Text>Time out: {outTime.format('HH:mm')}</Text>

        <TouchableHighlight style={styles.buttonContainer} onPress={this.startTimer}>
          <Text style={styles.button}>
            {this.state.timerRunning ? 'Stop' : 'Go!'}
          </Text>
        </TouchableHighlight>
      </View>
    );
  },
});

AppRegistry.registerComponent('SaveTheShoes', () => SaveTheShoes);

var styles = ({
  base: {
    padding: 20,
  },
  background: {
    backgroundColor: '#EFEFEF',
  },

  button: {
    color: '#007aff'
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
