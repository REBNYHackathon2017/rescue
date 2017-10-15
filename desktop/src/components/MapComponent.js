import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap(props => {


        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: 40.730610, lng: -73.935242}}
            >
                {props.data.map((entry, idx) => {
                    return <Marker key={idx} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>
                })}
            </GoogleMap>
        );
    })
);

export default MapComponent;
