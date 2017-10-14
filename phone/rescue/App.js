import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Buildings from './screens/Buildings';
import Details from './screens/Details';
import Emergency from './screens/Emergency';
import Favorites from './screens/Favorites';
import MapScreen from './screens/MapScreen';
import Medical from './screens/Medical';
import Resources from './screens/Resources';

const Screens = StackNavigator({
	Emergency: { screen: Emergency },
	Favorites: { screen: Favorites },
	Buildings: { screen: Buildings },
	MapScreen: { screen: MapScreen },
	Resources: { screen: Resources },
	Medical: { screen: Medical },
	Details: { screen: Details },
});

export default class App extends React.Component {
  render() {
    return (
      <Screens />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
