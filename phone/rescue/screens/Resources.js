import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Button from '../components/CustomButton';

import medical from '../assets/Asset3.png';
import fire from '../assets/Asset4.png';
import police from '../assets/Asset5.png';
import nature from '../assets/Asset6.png';
import building from '../assets/Asset7.png';
import other from '../assets/Asset8.png';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	group: {
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
		padding: 10,
	},
});

export default class Emergency extends React.Component {
	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container}>
				<View style={styles.imageRow}>
					<View style={styles.group}>
						<TouchableHighlight onPress={() => navigate('Medical')}>
							<Image style={styles.image} source={medical}/>
						</TouchableHighlight>
						<Text>Medical</Text>
					</View>
					<View style={styles.group}>
						<Image style={styles.image} source={fire}/>
						<Text>Fire & Rescue</Text>
					</View>
				</View>
				<View style={styles.imageRow}>
					<View style={styles.group}>
						<Image style={styles.image} source={police}/>
						<Text>Police</Text>
					</View>
					<View style={styles.group}>
						<Image style={styles.image} source={nature}/>
						<Text>Nature</Text>
					</View>
				</View>
				<View style={styles.imageRow}>
					<View style={styles.group}>
						<Image style={styles.image} source={building}/>
						<Text>Nature</Text>
					</View>
					<View style={styles.group}>
						<Image style={styles.image} source={other}/>
						<Text>Other</Text>
					</View>
				</View>
			</View>
		);
	}
}

