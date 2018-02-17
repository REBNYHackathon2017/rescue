import React, { Component } from 'react';
import MapComponent from '../../components/MapComponent';

export default class MapContainer extends Component {

  componentDidMount() {
    this.props.getAllReports();
  }

  render() {
    const { statusSort, reports, location } = this.props;
    const sortedData = (statusSort !== 'all') ? reports.filter((entry) => entry.status === statusSort) : reports;

    return (
      <MapComponent
        data={sortedData}
        location={location}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6Lhim26T6_uUFuofmuNuA1xfTQwj8J6A&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `650px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
