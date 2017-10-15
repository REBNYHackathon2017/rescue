import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Buildings from './screens/Buildings';
import Details from './screens/Details';
import Emergency from './screens/Emergency';
import Favorites from './screens/Favorites';
import Floors from './screens/Floors';
import MapScreen from './screens/MapScreen';
import Medical from './screens/Medical';
import Resources from './screens/Resources';

const Screens = StackNavigator({
	Emergency: { screen: Emergency },
	Favorites: { screen: Favorites },
	Buildings: { screen: Buildings },
	Floors: { screen: Floors },
	MapScreen: { screen: MapScreen },
	Resources: { screen: Resources },
	Medical: { screen: Medical },
	Details: { screen: Details },
});

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			building: null,
			latitude: null,
			longitude: null,
		};
	}

	setValue = (key, value) => {
		this.setState({ [key]: value });
	};

	render() {
		console.log('app state: ', this.state);
		return (
			<Screens screenProps={{ setValue: this.setValue }} />
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
