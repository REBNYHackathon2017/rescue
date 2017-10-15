import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap(props => {


        return (
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{lat: 40.780610, lng: -74}}
            >
                {props.data.map((entry, idx) => {
                    return <Marker key={idx} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>
                })}
            </GoogleMap>
        );
    })
);

export default MapComponent;
