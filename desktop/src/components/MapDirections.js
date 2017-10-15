/* eslint-disable no-undef */

import React from 'react';
import { compose, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";


const MapDirections = compose(
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.origin.lat, this.props.origin.lng),
        destination: new google.maps.LatLng(this.props.destination.latitude, this.props.destination.longitude),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },
      componentWillReceiveProps(nextProps) {
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
              origin: new google.maps.LatLng(this.props.origin.lat, this.props.origin.lng),
              destination: new google.maps.LatLng(nextProps.destination.latitude, nextProps.destination.longitude),
              travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                  this.setState({
                      directions: result,
                  });
              } else {
                  console.error(`error fetching directions ${result}`);
              }
          });
      }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

export default MapDirections;
