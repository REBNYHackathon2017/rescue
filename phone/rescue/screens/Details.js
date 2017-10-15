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
	static navigationOptions = {
		title: 'Details and Submit',
	};
	constructor() {
		super();
		this.state = { text: '' };
	}

	sendDetails = () => {
		const { text } = this.state;
		const { navigate } = this.props.navigation;
		const { setValue } = this.props.screenProps;
		setValue('details', text);
		let count = 0;
		this.waitForState = setInterval(() => {
			if (count < 10) {
				if (this.props.screenProps.details === text) {
					this.submit();
				} else {
					count +=1;
				}
			} else {
				clearInterval(this.waitForState);
			}
		}, 500);
		navigate('Status');
	};

	submit = () => {
		clearInterval(this.waitForState);
		const { _submitReport } = this.props.screenProps;
		_submitReport();
	}

	updateDetails = (text) => {
		this.setState({ text });
	}

	render() {
		const { text } = this.state;
		console.log('text: ', text);
		return (
			<View style={styles.container}>
				<FormLabel style={styles.label}>Emergency Details</FormLabel>
				<AutoGrowingTextInput onChangeText={this.updateDetails} placeholder={'Additional information (optional)'} />
				<Button onPress={this.sendDetails} text="SEND OUT MY SOS" />
			</View>
		);
	}
}
