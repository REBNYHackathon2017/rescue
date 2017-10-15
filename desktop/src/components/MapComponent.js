import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import police from '../assets/Asset_marker_police.png';
import nature from '../assets/Asset_marker_nature.png';
import medical from '../assets/Asset_marker_hospital.png';
import fire from '../assets/Asset_marker_fire.png';

const MapComponent = withScriptjs(withGoogleMap(props => {


        return (
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{lat: 40.780610, lng: -74}}
            >
                {props.data.map((entry, idx) => {

                    if (entry.resource === 'police') return <Marker key={idx} options={{icon: police}} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>
                    if (entry.resource === 'fire') return <Marker key={idx} options={{icon: fire}} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>
                    if (entry.resource === 'medical') return <Marker key={idx} options={{icon: medical}} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>
                    if (entry.resource === 'nature')return <Marker key={idx} options={{icon: nature}} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>

                    return <Marker key={idx} position={{lat: Number(entry.latitude), lng: Number(entry.longitude)}}/>
                })}
            </GoogleMap>
        );
    })
);

export default MapComponent;
