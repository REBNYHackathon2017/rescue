import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/CustomButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default class MapLocation extends React.Component {
	changeScreen = () => {
		const { navigate } = this.props.navigation;
		navigate('Favorites');
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Does your emergency pose an immediate threat to someone’s life, safety, health, or property?</Text>
				<Button color="gray" text="NO" />
				<Button onPress={this.changeScreen} text="YES" />
			</View>
		);
	}
}
