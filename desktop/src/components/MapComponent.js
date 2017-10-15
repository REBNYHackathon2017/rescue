import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import grayMarker from '../assets/parking_lot_maps.png';
import info from '../assets/info-i_maps.png';
import dispatch from '../assets/library_maps.png';

const MapComponent = withScriptjs(withGoogleMap(props => {


        return (
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{lat: 40.780610, lng: -74}}
            >
                {props.data.map((entry, idx) => {

                    if (entry.status === 'resolved') return <Marker key={idx} options={{icon: grayMarker}} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>
                    if (entry.status === 'pending') return <Marker key={idx} options={{icon: info}} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>
                    if (entry.status === 'dispatched') return <Marker key={idx} options={{icon: dispatch}} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>

                    return <Marker key={idx} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>
                })}
            </GoogleMap>
        );
    })
);

export default MapComponent;
