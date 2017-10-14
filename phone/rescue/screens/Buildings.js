import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default class Emergency extends React.Component {
	changeScreen = () => {
		const { navigate } = this.props.navigation;
		navigate('Map');
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Building</Text>
				<Text>Building</Text>
			</View>
		);
	}
}
