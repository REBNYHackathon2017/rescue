import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import MapDirections from '../../components/MapDirections';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import license from '../../assets/license.png';
const moment = require('moment-timezone');


export default class Detail extends Component {

    state = {
        entryFromSameNumber: []
    };

    componentDidMount() {
        const selectedEntry = this.props.data.filter((entry) => Number(entry.id) === Number(this.props.params.id))[0];
        const entryFromSameNumber = (selectedEntry && selectedEntry.length) ? this.props.data.filter((entry) => selectedEntry[0].mobile === entry.mobile) : this.props.data.slice();
        this.setState({ selectedEntry, entryFromSameNumber });
    }

    formatNumber = (mobile) => {
        if (!mobile) return;
        return `(${mobile.slice(0, 3)}) ${mobile.slice(3, 6)} - ${mobile.slice(6)}`
    };

    render() {
        const formattedData = this.state.entryFromSameNumber.sort((perv, curr) => perv.createdAt - curr.createdAt).map((entry) => {
            let nextObj = {...entry};
            const updatedFields = {
                id: entry.id,
                name: entry.name,
                location: entry.building,
                response: entry.resource,
                emergency: `${entry.resource} > ${entry.issue}`,
                status: entry.status,
                time: moment(entry.createdAt).tz('America/New_York').format('MMMM Do YYYY, h:mm a'),
            };

            nextObj = Object.assign({}, nextObj, updatedFields);
            return nextObj;
        });

        const circleStatus = (cell, row, enumObject, rowIndex) => {
            let statusCircle;
            if (row.status === 'resolved') {
                statusCircle = <div className="greenCircle"></div>
            }

            if (row.status === 'pending') {
                statusCircle = <div className="redCircle"/>
            }
            if (row.status === 'dispatched') {
                statusCircle = <div className="redCircle"/>
            }

            return statusCircle;
        };

        const updateDirectionToDisplay = (row) => {
            this.setState({selectedEntry: row});
        };

        function sortTime(a, b, order) {   // order is desc or asc
            if (order === 'desc') {
                return moment(b.createdAt) - moment(a.createdAt);
            } else {
                return moment(a.createdAt) - moment(b.createdAt);
            }
        };

        const tableOptions = {
            sortName: 'time',
            sortOrder: 'desc',
            sizePerPage: 3,
            onRowClick: updateDirectionToDisplay,
        };

        if (!this.props.location || !this.state.selectedEntry) return <div></div>
        const { selectedEntry } = this.state;
        return (
            <div>
                <style>{require('../List/styleHack')}</style>
                <Grid>
                    <Row className="show-grid">
                        <Col md={6}>
                            <div className="center">
                                <img height="180" src={license} alt="license"/>
                            </div>
                            <span className="center"><h4>{selectedEntry.name} - {this.formatNumber(selectedEntry.mobile) || `(848) 284-3328`}</h4></span>
                            <hr/>
                            <Col md={12}>
                                <Col md={6}>
                                    <b>Home:</b>
                                    <br/>
                                    312W 50TH Street, Apt. 12,
                                    <br/>
                                    New York, NY 10036
                                </Col>
                                <Col md={6}>
                                    <b>Work:</b>
                                    <br/>
                                    345 Park Avenue,
                                    <br/>
                                    New York, NY 10034
                                </Col>
                            </Col>
                            <h13>&nbsp;</h13>
                            <Col md={12} className={{display: 'inline-block'}}>
                                <Col md={6}>
                                    <b>Emergency Contact 1:</b>
                                    <br/>
                                    5 Park Avenue,
                                    <br/>
                                    New York, NY 10029
                                </Col>
                                <Col md={6}>
                                    <b>Emergency Contact 2:</b>
                                    <br/>
                                    162 Bridgewood Street,
                                    <br/>
                                    New York, NY 10031
                                </Col>
                            </Col>
                            <h6>&nbsp;</h6>
                            {(this.state.entryFromSameNumber) ?
                                <BootstrapTable data={formattedData} limit={3} keyField="id" striped={true}
                                                hover={true} pagination headerStyle={{color: "red"}}
                                                options={tableOptions}>
                                    <TableHeaderColumn dataField="status"
                                                       dataFormat={circleStatus}
                                                       width="30"
                                                       dataAlign="center">
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField="emergency"
                                                       dataSort={true}>Emergency
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField="time"
                                                       sortFunc={sortTime}
                                                       dataSort={true}>Time
                                    </TableHeaderColumn>
                                </BootstrapTable>
                                :
                                <div></div>
                            }
                        </Col>
                        <Col md={6}>
                            <h4>Responding To: <span className="selectedLink">{selectedEntry.resource}> {selectedEntry.issue}</span></h4>
                            <MapDirections
                                data={this.state.entryFromSameNumber}
                                origin={this.props.location}
                                destination={this.state.selectedEntry}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6Lhim26T6_uUFuofmuNuA1xfTQwj8J6A&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{height: `100%`}}/>}
                                containerElement={<div style={{height: `550px`}}/>}
                                mapElement={<div style={{height: `100%`}}/>}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}