import React from 'react';
import { Constants, Location, Permissions } from 'expo';
import { FlatList, Picker, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem, ListView, SearchBar } from 'react-native-elements';
import Button from '../components/CustomButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	scroll: {
		position: 'absolute',
		top: 0,
	},
});

const BUILDINGS = [
	{
		"address": "333 MADISON AVENUE",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 102.80675140198427,
		"fireCompany": "E021",
		"healthArea": "4800",
		"id": 20762,
		"latitude": "40.75359110215595",
		"longitude": "-73.97809483388626",
		"numberOfFloors": 26,
		"ownerName": "335 MADISON AVENUE LL",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 990319,
		"yCoord": 213831,
		"zip": 10017,
	},
	{
		"address": "51 EAST 42 STREET",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 229.8525159359637,
		"fireCompany": "E021",
		"healthArea": "4800",
		"id": 20755,
		"latitude": "40.75296538625647",
		"longitude": "-73.97855342323639",
		"numberOfFloors": 17,
		"ownerName": "ONE VANDERBILT OWNER",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 990192,
		"yCoord": 213603,
		"zip": 10017,
	},
	{
		"address": "50 VANDERBILT AVENUE",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 257.75184361475823,
		"fireCompany": "E021",
		"healthArea": "4800",
		"id": 20774,
		"latitude": "40.753999959464785",
		"longitude": "-73.97752441807881",
		"numberOfFloors": 22,
		"ownerName": "NEW YORK & HARLEM R.R",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 990477,
		"yCoord": 213980,
		"zip": 10017,
	},
	{
		"address": "341 MADISON AVENUE",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 263.4524216067558,
		"fireCompany": "E021",
		"healthArea": "4800",
		"id": 20773,
		"latitude": "40.75407141345663",
		"longitude": "-73.97799361331245",
		"numberOfFloors": 19,
		"ownerName": "MTA - METRO NORTH",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 990347,
		"yCoord": 214006,
		"zip": 10017,
	},
	{
		"address": "343 MADISON AVENUE",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 297.1789061552059,
		"fireCompany": "E021",
		"healthArea": "4800",
		"id": 20772,
		"latitude": "40.754167465751834",
		"longitude": "-73.97792139388527",
		"numberOfFloors": 13,
		"ownerName": "MTA - METRO NORTH",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 990367,
		"yCoord": 214041,
		"zip": 10017,
	},
	{
		"address": "340 MADISON AVENUE",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 361.98409276341494,
		"fireCompany": "E065",
		"healthArea": "4800",
		"id": 20761,
		"latitude": "40.7539371003189",
		"longitude": "-73.97895375070883",
		"numberOfFloors": 22,
		"ownerName": "340 MADISON AVENUE SY",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 990081,
		"yCoord": 213957,
		"zip": 10017,
	},
	{
		"address": "52 VANDERBILT AVENUE",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 364.85170629472066,
		"fireCompany": "E021",
		"healthArea": "4800",
		"id": 20775,
		"latitude": "40.7542579288108",
		"longitude": "-73.97733664277581",
		"numberOfFloors": 20,
		"ownerName": "VANDERBILT ASSOCIATES",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 990529,
		"yCoord": 214074,
		"zip": 10017,
	},
	{
		"address": "347 MADISON AVENUE",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 379.2060841216347,
		"fireCompany": "E021",
		"healthArea": "4800",
		"id": 20776,
		"latitude": "40.75438426245745",
		"longitude": "-73.97772280522072",
		"numberOfFloors": 20,
		"ownerName": "METRO NORTH",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 990422,
		"yCoord": 214120,
		"zip": 10017,
	},
	{
		"address": "330 MADISON AVENUE",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 416.7239496379913,
		"fireCompany": "E065",
		"healthArea": "4800",
		"id": 20754,
		"latitude": "40.753325102826956",
		"longitude": "-73.97940150211475",
		"numberOfFloors": 40,
		"ownerName": "330 MADISON CO LLC",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 989957,
		"yCoord": 213734,
		"zip": 10017,
	},
	{
		"address": "346 MADISON AVENUE",
		"createdAt": "2017-10-14T23:54:08.267Z",
		"distance": 433.38925081354535,
		"fireCompany": "E065",
		"healthArea": "4800",
		"id": 20771,
		"latitude": "40.75442833796147",
		"longitude": "-73.9785637804229",
		"numberOfFloors": 10,
		"ownerName": "346 MADISON AVENUE, L",
		"policePrecinct": "14",
		"updatedAt": "2017-10-14T23:54:08.267Z",
		"xCoord": 990189,
		"yCoord": 214136,
		"zip": 10017,
	},
];
export default class Emergency extends React.Component {
	constructor() {
		super();
		this.state = {
			buildings: null,
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
		let buildings;
		// set App state
		if (location && location.coords && location.coords.latitude && location.coords.longitude) {
			const lat = location.coords.latitude;
			const long = location.coords.longitude;
			// this.props.screenProps.setValue('longitude', lat);
			// this.props.screenProps.setValue('latitude', long);
			// buildings = this._getNearbyBuildingsAsync(lat, long);
		}

		this.setState({ location });
		if (buildings) {
			// this.setState({ buildings });
		}
	};

	_getNearbyBuildingsAsync = async (lat, long) => {
		try {
			let response = await fetch(`http://18.216.36.119:3002/api/buildings/near?lat=${lat}&lng=${long}`);
			let responseJson = await response.json();
			// this.setState({ buildings: responseJson });
			return responseJson;
		  } catch(error) {
			console.error(error);
		  }
	}

	changeToMapScreen = () => {
		const { navigate } = this.props.navigation;
		navigate('MapScreen');
	}

	chooseFloor = (building) => {
		const{ navigate } = this.props.navigation;
		const { setValue } = this.props.screenProps;
		setValue('building', building.address);
		setValue('numFloors', building.numberOfFloors);
		setValue('latitude', building.latitude);
		setValue('longitude', building.longitude);
		navigate('Floors');
	}

	updateIndex = (index) => {
		this.setState({ index })
	}

	render() {
		const { buildings, index, location } = this.state;
		return (
			<View style={{...StyleSheet.absoluteFillObject}}>
				<SearchBar
					lightTheme
					onChangeText={() => {}}
					placeholder='Search for a location'
				/>
				<ScrollView style={{ margin: 0 }}>
					<List containerStyle={{ marginBottom: 5 }}>
						{
							BUILDINGS.slice(0, 8).map((building, i) => {
								return (
									<ListItem
										key={building.id}
										onPress={this.chooseFloor.bind(this, building)}
										subtitle={`New York, NY ${building.zip}`}
										title={building.address}
									/>
								);
							})
						}
					</List>
					<View style={{ marginBottom: 10 }}>
						<Button
							onPress={this.changeToMapScreen}
							text="USE MAP INSTEAD"
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}
