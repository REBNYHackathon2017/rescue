import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/CustomButton';

const FAVORITE_LOCATIONS = [
	'HOME',
	'WORK',
	'BOYFRIEND',
	'BESTIE',
	"MOM'S",
	'SAKS'
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default class Favorites extends React.Component {

	render() {
		return (
			<View style={styles.container}>
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
			</View>
		);
	}
}
