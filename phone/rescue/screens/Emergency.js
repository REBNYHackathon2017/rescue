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

export default class Emergency extends React.Component {
	isEmergency = () => {
		const { navigate } = this.props.navigation;
		const { setValue } = this.props.screenProps;
		setValue('emergency', true);
		navigate('Favorites');
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Does your emergency pose an immediate threat to someone’s life, safety, health, or property?</Text>
				<Button color="gray" text="NO" />
				<Button onPress={this.isEmergency} text="YES" />
			</View>
		);
	}
}
