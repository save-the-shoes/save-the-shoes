'use strict';

var React = require('react-native');
var {
  AppRegistry,
  PickerIOS,
  Text,
  View,
} = React;

var PickerItemIOS = PickerIOS.Item;

var CAR_MAKES_AND_MODELS = {
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
  getInitialState: function() {
    return {
      carMake: '300',
      minutes: 0,
    };
  },

  render: function() {
    var make = CAR_MAKES_AND_MODELS[this.state.carMake];
    var selectionString = make.bar + ' bar which gives ' + make.minutes + ' minutes.';
    return (
      <View>
        <Text></Text>
        <Text>Enter your tank BA</Text>
        <PickerIOS
          selectedValue={this.state.carMake}
          onValueChange={(carMake) => this.setState({carMake, minutes: 0})}>
          {Object.keys(CAR_MAKES_AND_MODELS).map((carMake) => (
            <PickerItemIOS
              key={carMake}
              value={carMake}
              label={CAR_MAKES_AND_MODELS[carMake].bar}
              />
            )
          )}
        </PickerIOS>
        <Text>You selected: {selectionString}</Text>
      </View>
    );
  },
});

AppRegistry.registerComponent('SaveTheShoes', () => SaveTheShoes);
