import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Button from '../components/CustomButton';
import DraggableMarkers from '../examples/DraggableMarkers';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default class MapScreen extends React.Component {
	static navigationOptions = {
		title: 'Map',
	};
	constructor() {
		super();
		this.state = {
			coordinate: {
				latitude: 40.714421,
				longitude: -73.9425998,
			},
		};
	}
	changeScreen = () => {
		const { navigate } = this.props.navigation;
		navigate('Resources');
	}

	updateLocation = (coords) => {
		const { setValue } = this.props.screenProps;
		setValue('latitude', coords.latitude);
		setValue('longitude', coords.longitude);
	};

	render() {
		const { latitude, longitude } = this.props.screenProps;
		const coords = {
			latitude,
			longitude,
		};
		return (
			<View style={styles.container}>
				<DraggableMarkers
					coords={coords}
					provider={PROVIDER_GOOGLE}
					updateLocation={this.updateLocation}
				/>
				<Button onPress={this.changeScreen} text="CONFIRM LOCATION" />
			</View>
		);
	}
}
