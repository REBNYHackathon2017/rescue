import React, { Component } from 'react';
import MapComponent from './MapComponent';


class MapContainer extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } } = { coords: {} }) => {
        this.setState({ location: { lat: latitude, lng: longitude } }, () => console.log(this.state))
      });
    }
  }

  render() {
    return (
      <MapComponent
        location={this.state.location}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6Lhim26T6_uUFuofmuNuA1xfTQwj8J6A&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default MapContainer;
