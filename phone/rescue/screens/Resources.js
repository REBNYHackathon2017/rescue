import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Button from '../components/CustomButton';

import medical from '../assets/icons/medical.png';
import fire from '../assets/icons/fire.png';
import police from '../assets/icons/police.png';
import nature from '../assets/icons/disaster.png';
import building from '../assets/icons/building.png';
import other from '../assets/icons/phone.png';

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
		height: 65,
		margin: 25,
		width: 65,
	},
	imageRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		width: 300,
	},
	text: {
		color: 'gray',
		fontSize: 22,
	},
	title: {
		color: 'gray',
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 10,
	},
});

export default class Resources extends React.Component {
	static navigationOptions = {
		title: 'Emergency Type',
	};

	updateResource = (resource) => {
		const { navigate } = this.props.navigation;
		const { setValue } = this.props.screenProps;
		setValue('resource', resource.toLowerCase());
		navigate(resource);
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container}>
				<Text style={styles.title}></Text>
				<View style={styles.imageRow}>
					<View style={styles.group}>
						<TouchableHighlight onPress={this.updateResource.bind(this, 'Medical')}>
							<Image style={styles.image} source={medical}/>
						</TouchableHighlight>
						<Text style={styles.text}>Medical</Text>
					</View>
					<View style={styles.group}>
						<Image style={styles.image} source={fire}/>
						<Text style={styles.text}>Fire & Rescue</Text>
					</View>
				</View>
				<View style={styles.imageRow}>
					<View style={styles.group}>
						<Image style={styles.image} source={police}/>
						<Text style={styles.text}>Police</Text>
					</View>
					<View style={styles.group}>
						<Image style={styles.image} source={nature}/>
						<Text style={styles.text}>Nature</Text>
					</View>
				</View>
				<View style={styles.imageRow}>
					<View style={styles.group}>
						<Image style={styles.image} source={building}/>
						<Text style={styles.text}>Building</Text>
					</View>
					<View style={styles.group}>
						<Image style={styles.image} source={other}/>
						<Text style={styles.text}>Other</Text>
					</View>
				</View>
			</View>
		);
	}
}

