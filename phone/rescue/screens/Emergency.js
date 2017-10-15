import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

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
	top: {
		backgroundColor: '#d1c5c6',
		flex: .1,
		alignItems: 'center',
	},
	topHeader: {
		height: 70,
		width: 100,
	},
});

export default class Emergency extends React.Component {
	static navigationOptions = {
		header: (
			<View style={styles.top}>
				<Image
					source={require('../assets/rescue.png')}
					style={styles.topHeader}
				/>
			</View>
		),
		headerBackTitle: 'Emergency',
		title: 'Emergency',
	};

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
