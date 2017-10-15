import _ from 'lodash';
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
	Details: { screen: Details },
	Emergency: { screen: Emergency },
	Favorites: { screen: Favorites },
	Buildings: { screen: Buildings },
	Floors: { screen: Floors },
	MapScreen: { screen: MapScreen },
	Resources: { screen: Resources },
	Medical: { screen: Medical },
});

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			building: null,
			details: '',
			emergency: false,
			floor: null,
			issue: null,
			latitude: null,
			longitude: null,
			numFloors: null,
			resource: null,
		};
	}

	setValue = (key, value) => {
		if (key === 'details') {
			console.log('key: ', key, value);
		}
		this.setState({ [key]: value });
	};

	_submitReport = async () => {
		const config = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(report),
		};
		const report = _.omit(this.state, 'numFloors');
		console.log('report: ', report);
		try {
			// let response = await fetch('http://18.216.36.119:3002/api/reports/', config);
			console.log('response: ', response);
		} catch(error) {
			console.error(error);
		}


		// _getNearbyBuildingsAsync = async (lat, long) => {
		// 	try {
		// 		let response = await fetch(`http://18.216.36.119:3002/api/buildings/near?lat=${lat}&lng=${long}`);
		// 		let responseJson = await response.json();
		// 		// this.setState({ buildings: responseJson });
		// 		return responseJson;
		// 	} catch(error) {
		// 		console.error(error);
		// 	}
		// }

	}

	render() {
		const { details, numFloors } = this.state;
		console.log('app render state: ', this.state);
		return (
			<Screens
				screenProps={{
					_submitReport: this._submitReport,
					numFloors,
					setValue: this.setValue
				}}
			/>
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
