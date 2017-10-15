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
import Status from './screens/Status';

const Screens = StackNavigator({
	Status: { screen: Status },
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
		this.setState({ [key]: value });
	};

	_submitReport = async () => {
		const report = _.omit(this.state, 'numFloors');
		const config = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(report),
		};
		try {
			let response = await fetch('http://18.216.36.119:3002/api/reports/', config);
			console.log('response: ', response);
		} catch(error) {
			console.error(error);
		}
	}

	render() {
		const fake = {
			"emergency": true,
			"latitude": "40.741135",
			"longitude": "-74.008047",
			"building": "848 WASHINGTON STREET",
			"floor": 18,
			"resource": "medical",
			"issue": "stroke",
			"details": "i think my husband is having a stroke"
		};
		const { building, details, floor, issue, resource } = fake;
		const numFloors = 3;

		// const { details, issue, numFloors, resource } = this.state;
		return (
			<Screens
				screenProps={{
					_submitReport: this._submitReport,
					building,
					details,
					floor,
					issue,
					numFloors,
					resource,
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
