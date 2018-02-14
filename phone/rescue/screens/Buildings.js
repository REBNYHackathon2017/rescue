import React from 'react';
import { Constants, Location, Permissions } from 'expo';
import { FlatList, Picker, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem, ListView, SearchBar } from 'react-native-elements';
import Button from '../components/CustomButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	scroll: {
		position: 'absolute',
		top: 0,
	},
});

export default class Emergency extends React.Component {
	static navigationOptions = {
		title: 'Nearby Buildings',
	};

	constructor() {
		super();
		this.state = {
			buildings: [],
			index: 0,
			location: null,
			search: '',
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

		if (location && location.coords && location.coords.latitude && location.coords.longitude) {
			const lat = location.coords.latitude;
			const long = location.coords.longitude;
			this.props.screenProps.setValue('latitude', lat);
			this.props.screenProps.setValue('longitude', long);
			buildings = this._getNearbyBuildingsAsync(lat, long);
		}

		this.setState({ location });
	};

	_getNearbyBuildingsAsync = async (lat, long) => {
		try {
			let response = await fetch(`http://34.204.33.48:3002/api/buildings/near?lat=${lat}&lng=${long}`);
			let responseJson = await response.json();
			this.setState({ buildings: responseJson });
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
		this.setState({ index });
	}

	updateSearch = (search) => {
		this.setState({ search });
	}

	render() {
		const { buildings, index, location, search } = this.state;
		const filteredBuildings = buildings.filter((building) => {
			return building.address.toLowerCase().includes(search.toLowerCase());
		});
		return (
			<View style={{...StyleSheet.absoluteFillObject}}>
				<SearchBar
					lightTheme
					onChangeText={this.updateSearch}
					placeholder='Search for a location'
				/>
				<ScrollView style={{ margin: 0 }}>
						<List containerStyle={{ marginBottom: 5 }}>
						{
							filteredBuildings.slice(0, 8).map((building, i) => {
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
