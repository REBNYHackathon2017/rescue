import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel } from 'react-native-elements'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import Button from '../components/CustomButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	input: {
		borderColor: 'gray',
		borderWidth: 1,
		width: 310,
	},
	label: {
		marginBottom: 10,
	},
});

export default class Details extends React.Component {
	constructor() {
		super();
		this.state = { text: '' };
	}

	render() {
		return (
			<View style={styles.container}>
				<FormLabel style={styles.label}>Emergency Details</FormLabel>
				<AutoGrowingTextInput returnKeyType="done" style={styles.input} placeholder={'Additional information (optional)'} />
				<Button text="SEND OUT MY SOS" />
			</View>
		);
	}
}
