import _ from 'lodash';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';

import Button from '../components/CustomButton';

const styles = StyleSheet.create({
	activeStatus: {
		color: '#e10006',
		fontSize: 26,
		fontWeight: 'bold',
	},
	container: {
		alignItems: 'flex-start',
		backgroundColor: '#fff',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		paddingLeft: 25,
	},
	details: {
		alignSelf: 'flex-start',
		color: 'gray',
		fontSize: 20,
	},
	header: {
		alignSelf: 'flex-start',
		fontSize: 22,
		fontWeight: 'bold',
	},
	reportGroup: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop: 20,
	},
	status: {
		color: 'gray',
		fontSize: 26,
		fontWeight: 'bold',
		paddingBottom: 10,
		paddingTop: 10,
	},
	statusGroup: {
		alignItems: 'flex-start',
		flex: 0.5,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		marginTop: 300,
	},
	statusIndicatorCheck: {
		height: 30,
		marginRight: 10,
		width: 30,
	},
	statusIndicatorWaiting: {
		height: 30,
		marginRight: 10,
		marginTop: 11,
		width: 30,
	},
	statusLine: {
		flexDirection: 'row',
		marginTop: 30,
	},
});

export default class Status extends React.Component {
	constructor() {
		super();
		this.state = {
			dispatched: false,
			resolved: false,
		}
	}

	componentDidMount() {
		const socket = io('http://34.204.33.48:3002');
        socket.on('update', data => {
			if (data.id === this.props.screenProps.id) {
				if (data.status === 'dispatched') {
					this.setState({ dispatched: true });
				} else if (data.status === 'resolved') {
					this.setState({ resolved: true });
				}
			}
        });
	}

	render() {
		const { building, details, floor, issue, resource } = this.props.screenProps;
		const { dispatched, resolved } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.reportGroup}>
					<Text style={styles.header}>Your Emergency:</Text>
					<Text style={styles.details}>{resource}, {issue}</Text>
					<Text style={styles.details}>{_.invoke(building, 'toLowerCase')}, Floor {floor}</Text>
				</View>
				<View style={styles.reportGroup}>
					<Text style={styles.header}>Notes:</Text>
					<Text style={styles.details}>{details}</Text>
				</View>
				<View style={styles.statusGroup}>
					<View style={styles.statusLine}>
						<Image
							source={require('../assets/Asset-10.png')}
							style={styles.statusIndicatorCheck}
						/>
						<Text style={styles.activeStatus}>Emergency Sent</Text>
					</View>
					<View style={styles.statusLine}>
						<Image
							source={dispatched ? require('../assets/Asset-10.png') : require('../assets/Asset-11.png')}
							style={dispatched ? styles.statusIndicatorCheck : styles.statusIndicatorWaiting}
						/>
						<Text style={dispatched ? styles.activeStatus : styles.status}>Responders Dispatched</Text>
					</View>
					<View style={styles.statusLine}>
						<Image
							source={resolved ? require('../assets/Asset-10.png') : require('../assets/Asset-11.png')}
							style={resolved ? styles.statusIndicatorCheck : styles.statusIndicatorWaiting}
						/>
						<Text style={resolved ? styles.activeStatus : styles.status}>Emergency Resolved</Text>
					</View>
				</View>
			</View>
		);
	}
}
