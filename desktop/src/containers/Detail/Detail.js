import React, {Component} from 'react';
import {Grid, Row, Col, ButtonGroup, Button} from 'react-bootstrap';
import MapDirections from '../../components/MapDirections';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import license from '../../assets/license.png';
import * as moment from 'moment-timezone';
import { browserHistory } from 'react-router'


export default class Detail extends Component {

    state = {
        reportsFromSameMobile: [],
        showMap: true
    };

    componentDidMount() {
        const { params, getAllReports } = this.props;

        getAllReports()
            .then(() => {
                const report = this.props.reports.filter(({ id }) => Number(id) === Number(params.id))[0];
                const reportsFromSameMobile = (report && this.props.reports.length) ?
                    this.props.reports.filter(r => report.mobile === r.mobile) :
                    this.props.reports;

                this.setState({ report, reportsFromSameMobile });
            })
            .catch(err => console.log('Error setting state in details page!', err));
    }

    toMap() {
        this.setState({ showMap: true })
    }

    toPhoto() {
        this.setState({ showMap: false })
    }

    formatNumber = (mobile) => {
        if (!mobile) return;
        return `(${mobile.slice(0, 3)}) ${mobile.slice(3, 6)} - ${mobile.slice(6)}`
    };

    render() {
        const { location } = this.props;

        const formattedData = this.state.reportsFromSameMobile.sort((perv, curr) => perv.createdAt - curr.createdAt).map(r => {
            let nextObj = {...r};
            const updatedFields = {
                id: r.id,
                name: r.name,
                location: r.building,
                response: r.resource,
                emergency: `${r.resource} > ${r.issue}`,
                status: r.status,
                time: moment(r.createdAt).tz('America/New_York').format('MMMM Do YYYY, h:mm a'),
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

        const updateDirectionToDisplay = (report) => {
            browserHistory.push(`/list/${report.id}`);
            this.setState({ report });
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

        let { report } = this.state;

        if (!this.props.location || !this.state.report) return <div></div>

        const mapPanel = this.state.showMap ?
            <MapDirections
                data={this.state.reportsFromSameMobile}
                origin={location}
                destination={this.state.report}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6Lhim26T6_uUFuofmuNuA1xfTQwj8J6A&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `550px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            /> :
            <img
                width="100%"
                alt="Image of incident"
                src={this.state.report.img}
            />

        return (
            <div>
                <style>{require('../List/styleHack')}</style>
                <Grid>
                    <Row className="show-grid">
                        <Col md={6}>
                            <div className="center">
                                <img height="180" src={license} alt="license"/>
                            </div>
                            <span className="center"><h4>{report.name} - {this.formatNumber(report.mobile) || `(848) 284-3328`}</h4></span>
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
                            {(this.state.reportsFromSameMobile) ?
                                <BootstrapTable className="pointer"
                                                data={formattedData} limit={3} keyField="id" striped={true}
                                                hover={true} pagination headerStyle={{color: "red"}}
                                                options={tableOptions}>
                                    <TableHeaderColumn dataField="status"
                                                       dataFormat={circleStatus}
                                                       width="30"
                                                       dataAlign="center">
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                                       dataField="emergency"
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
                            <h4>Responding To: <span className="selectedLink">{report.resource}> {report.issue}</span></h4>
                            <ButtonGroup className="moose">
                                <Button onClick={this.toMap.bind(this)}>Map</Button>
                                <Button onClick={this.toPhoto.bind(this)}>Photo</Button>
                            </ButtonGroup>
                            { mapPanel }
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}