import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Button from '../components/CustomButton';

import medical from '../assets/Asset3.png';
import fire from '../assets/Asset4_2.png';
import police from '../assets/Asset5_3.png';
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
		height: 65,
		margin: 25,
		width: 65,
	},
	imageRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
	text: {
		color: 'gray',
		fontSize: 22,
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
				<View style={styles.imageRow}>
					<View style={styles.group}>
						<TouchableHighlight onPress={this.updateResource.bind(this, 'Medical')}>
							<Image style={styles.image} source={medical}/>
						</TouchableHighlight>
						<Text style={styles.text}>Medical</Text>
					</View>
					<View style={styles.group}>
						<TouchableHighlight onPress={this.updateResource.bind(this, 'Medical')}>
							<Image style={styles.image} source={fire}/>
						</TouchableHighlight>
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
						<Text style={styles.text}>Nature</Text>
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

