import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { HeaderBackButton } from 'react-navigation';

import Button from '../components/CustomButton';

const FAVORITE_LOCATIONS = [
	'HOME',
	'WORK',
	"MOM'S",
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: 'gray',
		fontSize: 22,
		marginBottom: 10,
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

export default class Favorites extends React.Component {
	static navigationOptions = {
		title: 'Stored Locations',
	};

	changeScreen = () => {
		const { navigate } = this.props.navigation;
		navigate('Buildings');
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Where are you?</Text>
				{
					FAVORITE_LOCATIONS.map((place, i) => {
						return (
							<Button
								color="gray"
								key={`${place}_${i}`}
								text={place}
							/>
						)
					})
				}
				<Button onPress={this.changeScreen} text={"NONE OF THESE"}/>
			</View>
		);
	}
}
