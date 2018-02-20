import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
});


export default class CustomButton extends React.Component {
	render() {
		const { color, icon, onPress, text } = this.props;
		return (
			<View>
				<Button
					backgroundColor={color === 'gray' ? 'gray' : '#e10006'}
					buttonStyle={{
						alignSelf: 'center',
						height: 50,
						margin: 10,
						width: 300,
					}}
					fontWeight='bold'
					large={true}
					onPress={onPress}
					title={text}
				/>
			</View>
		);
	}
}
