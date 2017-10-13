import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap(props => {

  return (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{ lat: 39, lng: -79 }}
    >
      <Marker position={{ lat: 38, lng: -80 }} />
      <Marker position={props.location} />
    </GoogleMap>
  );
}))


export default MapComponent;
