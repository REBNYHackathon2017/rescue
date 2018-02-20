import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

import Button from '../components/CustomButton';

import background from '../assets/background.png';

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'transparent',
		justifyContent: 'center',
	},
	opener: {
		backgroundColor: 'transparent',
		fontSize: 22,
		marginBottom: 20,
		textAlign: 'center',
	},
	question: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
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
			<ImageBackground source={background} style={styles.backgroundImage}>
				<View style={styles.container}>
					<View style={styles.textGroup}>
						<Text style={styles.opener}>Does Your Emergency Pose an Immediate Threat to Someone’s:</Text>
						<Text style={styles.question}>Life, Safety, Health, or Property?</Text>
					</View>
					<Button color="gray" text="NO" />
					<Button onPress={this.isEmergency} text="YES" />
				</View>
			</ImageBackground>
		);
	}
}
