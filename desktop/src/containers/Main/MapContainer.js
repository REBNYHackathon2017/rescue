import React, { Component, PropTypes } from 'react';
import MapComponent from '../../components/MapComponent';
import {Marker} from 'react-google-maps';

export default class MapContainer extends Component {
  static propTypes = {
    data: PropTypes.array,
  };

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

  // displayMarkers = () => {
  //     if (!this.props.data) return [];
  //     let markers = [];
  //
  //     this.props.data.forEach((entry, idx) => {
  //         markers.push(
  //             <Marker key={idx} position={{lat: +entry.latitude, lng: +entry.longitude}}/>
  //         );
  //     });
  //
  //     return markers;
  // };

  render() {
    // const markers = this.displayMarkers();

    return (
      <MapComponent
        data={this.props.data}
        location={this.state.location}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6Lhim26T6_uUFuofmuNuA1xfTQwj8J6A&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `650px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
