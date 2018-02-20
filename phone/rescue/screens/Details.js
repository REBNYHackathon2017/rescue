import React from 'react';
import { Image, Keyboard, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FormLabel } from 'react-native-elements'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Constants, Location, Permissions, ImagePicker } from "expo";
import * as firebase from "firebase";

import Button from '../components/CustomButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	image: {
		height: 200,
		marginBottom: 15,
		width: 200,
	},
	input: {
		borderColor: 'gray',
		borderWidth: 1,
		fontSize: 18,
		marginBottom: 15,
		padding: 5,
		width: 300,
	},
	label: {
		marginBottom: 10,
	},
	sendContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	title: {
		color: 'gray',
		fontSize: 22,
		fontWeight: 'normal',
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

	componentWillMount() {
		const config = {
			apiKey: "AIzaSyAn5WPeKG3CEWCUvZAcZwkeq5i58jqoPGc",
			authDomain: "rescue-55c21.firebaseapp.com",
			storageBucket: "rescue-55c21.appspot.com",
			projectId: "rescue-55c21",
		};

		if (firebase.apps.length) {
			return; //  return if firebase app already exists.
		}

		firebase.initializeApp(config);
		firebase
			.auth()
			.signInWithEmailAndPassword(
				"rescue02152018@gmail.com",
				"rescuePD"
			);
	}

	blur = () => {
		Keyboard.dismiss();
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
	}

	pickImage = async () => {
		const result = await ImagePicker.launchCameraAsync({
			aspect: [4, 3],
			base64: true,
		});

		if (result.cancelled) {
			return;
		}

		if (!result.cancelled) {
			const byteArray = this.convertToByteArray(result.base64);

			this._uploadAsByteArray(byteArray);
		}
	}

	// Helper Function https://github.com/aaronksaunders/expo-rn-firebase-image-upload/blob/master/README.md
	convertToByteArray = (input) => {
		const binary_string = this.atob(input);
		const len = binary_string.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes;
	}

	atob = (input) => {
		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

		const str = input.replace(/=+$/, "");
		let output = "";

		if (str.length % 4 === 1) {
			throw new Error(
			"'atob' failed: The string to be decoded is not correctly encoded."
			);
		}
		/* eslint no-cond-assign: 0, no-bitwise: 0 */
		for (
			let bc = 0, bs = 0, buffer, i = 0;
			(buffer = str.charAt(i++));
			~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
			? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
			: 0
		) {
			buffer = chars.indexOf(buffer);
		}

		return output;
	}

  //  Upload function https://github.com/aaronksaunders/expo-rn-firebase-image-upload/blob/master/README.md
	_uploadAsByteArray = async pickerResultAsByteArray => {
		const metadata = {
			contentType: "image/jpeg",
		};

		const storageRef = firebase
			.storage()
			.ref()
			.child(`incidents`)
			.child(
				`${new Date().toISOString()}.jpeg`
			);

		const upload = await storageRef.put(pickerResultAsByteArray, metadata);

		const { setValue } = this.props.screenProps;
		setValue('img', upload.downloadURL);

		this.setState({ img: upload.downloadURL });
	}

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
		return (
			<TouchableOpacity onPress={this.blur} style={styles.container}>
				<FormLabel labelStyle={styles.title}>Emergency Details</FormLabel>
				{this.state.img ? (
						<Image
							source={{ uri: this.state.img }}
							style={styles.image}
						/>
					) : <Text />
				}
				<AutoGrowingTextInput style={styles.input} onChangeText={this.updateDetails} placeholder={'Additional information (optional)'} />
				<Button onPress={this.pickImage} text="TAKE PICTURE OF INCIDENT"/>
				<View style={styles.sendContainer}>
					<Button onPress={this.sendDetails} text="SEND OUT MY SOS" />
				</View>
			</TouchableOpacity>
		);
	}
}
