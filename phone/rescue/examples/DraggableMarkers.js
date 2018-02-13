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
	const coords = {
		latitude: LATITUDE + SPACE,
		longitude: LONGITUDE + SPACE,
	};
	this.state = { coords };
  }

  setCoords = (e) => {
	this.setState({
		coords: e.nativeEvent.coordinate,
	});
  }

  render() {
	return (
	  <View style={styles.container}>
		<MapView
		  provider={this.props.provider}
		  style={styles.map}
		  initialRegion={{
			latitude: LATITUDE,
			longitude: LONGITUDE,
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
		  }}
		>
		  <Marker
			coordinate={this.state.coords}
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
	...StyleSheet.absoluteFillObject,
	justifyContent: 'flex-end',
	alignItems: 'center',
  },
  map: {
	...StyleSheet.absoluteFillObject,
  },
});

export default MarkerTypes;
