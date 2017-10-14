import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';

import { SearchBar } from 'react-native-elements';

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
		this.state = { index: 0 };
	}

	// changeScreen = () => {
	// 	const { navigate } = this.props.navigation;
	// 	navigate('Map');
	// }

	updateIndex = (index) => {
		this.setState({ index })
	}

	render() {
		const { index } = this.state;
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
			</View>
		);
	}
}
