import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

import Button from '../components/CustomButton';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: 75,
		margin: 25,
		width: 75,
	},
	imageRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default class Emergency extends React.Component {
	changeScreen = () => {
		const { navigate } = this.props.navigation;
		navigate('Favorites');
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imageRow}>
					<Image style={styles.image} source={require('../assets/Asset3.png')}/>
					<Image style={styles.image} source={require('../assets/Asset3.png')}/>
				</View>
			</View>
		);
	}
}

