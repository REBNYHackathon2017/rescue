import _ from 'lodash';
import React from 'react';
import { Constants, Location, Permissions } from 'expo';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import Button from '../components/CustomButton';

const PickerItem = Picker.Item;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default class Emergency extends React.Component {
	static navigationOptions = {
		title: 'Building Floor',
	};

	constructor() {
		super();
		this.state = {
			floor: 0,
		};
	}

	changeToMapScreen = () => {
		const { navigate } = this.props.navigation;
		navigate('MapScreen');
	}

	changeToResources = () => {
		const { navigate } = this.props.navigation;
		const { setValue } = this.props.screenProps;
		setValue('floor', this.state.floor);
		navigate('Resources');
	}

	updateFloor = (floor) => {
		this.setState({ floor });
	}

	render() {
		const { buildings, floor } = this.state;
		const { numFloors } = this.props.screenProps;
		const floors = numFloors || 1;
		const floorArr = [...Array(floors || 1).keys()].map((num) => num + 1);
		return (
			<View>
				<Picker selectedValue={floor} onValueChange={this.updateFloor}>
					{
 						floorArr.map((floor, i) => {
 							return (
 								<PickerItem key={i} label={floor.toString()} value={floor.toString()} />
 							);
 						})
 					}
 				</Picker>
				 <Button
					onPress={this.changeToResources}
					text="GO"
				/>
				<Button
					onPress={this.changeToMapScreen}
					text="USE MAP INSTEAD"
				/>
			</View>
		);
	}
}
