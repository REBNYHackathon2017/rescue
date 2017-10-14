import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/CustomButton';

const ISSUES = [
	'CORONARY',
	'STROKE',
	'INJURY',
	'SICKNESS',
	'BIRTH',
	'ALIEN ABDUCTION',
	'SOMETHING ELSE',
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default class Medical extends React.Component {
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				{
					ISSUES.map((issue) => {
						return (<Button key={issue} onPress={() => { navigate('Details')}} text={issue} />);
					})
				}
			</View>
		);
	}
}
