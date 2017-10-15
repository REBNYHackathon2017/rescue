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

	render() {
		return (
			<View style={styles.container}>
				<DraggableMarkers provider={PROVIDER_GOOGLE} />
				<Button onPress={this.changeScreen} text="CONFIRM LOCATION" />
			</View>
		);
	}
}
