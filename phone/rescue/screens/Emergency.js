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
	opener: {
		fontSize: 25,
		marginBottom: 20,
	},
	question: {
		fontSize: 25,
	},
	textGroup: {
		alignItems: 'center',
		marginBottom: 20,
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

				<View style={styles.textGroup}>
					<Text style={styles.opener}>Does Your Emergency Pose an Immediate Threat to Someone’s:</Text>
					<Text style={styles.question}>Life</Text>
					<Text style={styles.question}>Safety</Text>
					<Text style={styles.question}>Health</Text>
					<Text style={styles.question}>or Property?</Text>
				</View>
				<Button color="gray" text="NO" />
				<Button onPress={this.isEmergency} text="YES" />
			</View>
		);
	}
}
