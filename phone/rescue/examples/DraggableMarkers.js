import _ from 'lodash';
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 40.764203723211125
const LONGITUDE = -73.9705365523696
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.00;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class MarkerTypes extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
		coords: {
			latitude: this.props.coords.latitude || LATITUDE,
			longitude: this.props.coords.longitude || LONGITUDE,
		},
	};
  }

  setCoords = (e) => {
	this.props.updateLocation(e.nativeEvent.coordinate);
	this.setState({
		coords: e.nativeEvent.coordinate,
	});
  }

  render() {
	  const { coords } = this.props;
	return (
	  <View style={styles.container}>
		<MapView
		  provider={this.props.provider}
		  style={styles.map}
		  initialRegion={{
			latitude: coords.latitude || LATITUDE,
			longitude: coords.longitude || LONGITUDE,
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
		  }}
		>
		  <Marker
			coordinate={(coords.latitude && coords.longitude) ? coords : this.state.coords}
			onSelect={(e) => log('onSelect', e)}
			onDrag={(e) => log('onDrag', e)}
			onDragStart={(e) => log('onDragStart', e)}
			onDragEnd={(e) => this.setCoords(e)}
			onPress={(e) => log('onPress', e)}
			draggable
		  />
		</MapView>
	  </View>
	);
  }
}

MarkerTypes.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		height: 500,
		width: 360,
	},
});

export default MarkerTypes;
