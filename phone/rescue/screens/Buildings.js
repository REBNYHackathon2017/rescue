import React from 'react';
import { Constants, Location, Permissions } from 'expo';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import Button from '../components/CustomButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const BUILDINGS = [
	{
		address: '10 SOUTH STREET',
		numberOfFloors: 5,
		XCoord: 981037,
		YCoord: 194506,
		zip: 10004,
		ownerName: '10 SSA LANDLORD, LLC',
		healthArea: '7700',
		policePrecinct: '1',
		fireCompany: 'L015',
		latitude: 40.70055018440018,
		longitude: -74.0115876259819,
	},
	{
		address: '15 SOUTH STREET',
		numberOfFloors: 5,
		XCoord: 981037,
		YCoord: 194506,
		zip: 10004,
		ownerName: '15 SSA LANDLORD, LLC',
		healthArea: '7700',
		policePrecinct: '1',
		fireCompany: 'L015',
		latitude: 40.70055018440018,
		longitude: -74.0115876259819,
	},
	{
		address: '20 SOUTH STREET',
		numberOfFloors: 5,
		XCoord: 981037,
		YCoord: 194506,
		zip: 10004,
		ownerName: '20 SSA LANDLORD, LLC',
		healthArea: '7700',
		policePrecinct: '1',
		fireCompany: 'L015',
		latitude: 40.70055018440018,
		longitude: -74.0115876259819,
	},
	{
		address: '25 SOUTH STREET',
		numberOfFloors: 5,
		XCoord: 981037,
		YCoord: 194506,
		zip: 10004,
		ownerName: '25 SSA LANDLORD, LLC',
		healthArea: '7700',
		policePrecinct: '1',
		fireCompany: 'L015',
		latitude: 40.70055018440018,
		longitude: -74.0115876259819,
	},
];

export default class Emergency extends React.Component {
	constructor() {
		super();
		this.state = {
			index: 0,
			location: null,
		};
	}

	componentWillMount() {
		this._getLocationAsync();
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		console.log('location: ', location);
		// this.props.screenProps.setCoords(location.coords);
		this.setState({ location });
	};
	changeToMapScreen = () => {
		const { navigate } = this.props.navigation;
		navigate('MapScreen');
	}

	updateIndex = (index) => {
		this.setState({ index })
	}

	render() {
		const { index, location } = this.state;
		return (
			<View >
				<SearchBar
					lightTheme
					onChangeText={() => {}}
					placeholder='Search for a location'
				/>
				<Picker selectedValue={BUILDINGS[index]} onValueChange = {this.updateIndex}>
					{
						BUILDINGS.map((building, i) => {
							return (
								<Picker.Item
									key={`${building.address}_${i}`}
									label={building.address}
									value={building.address}
								/>
							);
						})
					}
				</Picker>
				{ location ? (<Text>{JSON.stringify(location)}</Text>) : <Text/> }
				<Button
					onPress={this.changeToMapScreen}
					text="USE MAP"
				/>
			</View>
		);
	}
}
