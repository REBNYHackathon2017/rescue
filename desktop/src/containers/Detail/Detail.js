import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import MapComponent from '../../components/MapComponent';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import license from '../../assets/license.png';

export default class Detail extends Component {
    static propTypes = {
        params: PropTypes.object, // from react router
        getAllReports: PropTypes.func,
    };

    componentWillMount() {
        const selectedEntry = this.props.data.filter((entry) => Number(entry.id) === Number(this.props.params.id));
        const entryFromSameNumber = (selectedEntry && selectedEntry.length) ? this.props.data.filter((entry) => selectedEntry[0].mobile === entry.mobile) : this.props.data.slice();
        this.setState({selectedEntry, entryFromSameNumber});
    }

    componentDidMount() {
        this.props.getAllReports();
    }

    render() {
        const selectedEntry = this.state.selectedEntry[0] || {};
        const formattedData = this.state.entryFromSameNumber.sort((perv, curr) => perv.createdAt - curr.createdAt).map((entry) => {
            return {
                id: entry.id,
                name: entry.name,
                location: entry.building,
                response: entry.resource,
                emergency: `${entry.resource} > ${entry.issue}`,
                status: entry.status,
                time: entry.createdAt,
            }
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


        const tableOptions = {paginationSize: 3};

        return (
            <div>
                <style>{require('../List/styleHack')}</style>
                <Grid>
                    <Row className="show-grid">
                        <Col md={6}>
                            <img height="200" src={license} alt="license"/>
                            <h4>{selectedEntry.name} - {selectedEntry.mobile}</h4>
                            <hr/>
                            <Col md={12}>
                                <Col md={6}>
                                    Home:
                                    <br/>
                                    312W 50TH Street, Apt. 12,
                                    <br/>
                                    New York, NY 10036
                                </Col>
                                <Col md={6}>
                                    Work:
                                    <br/>
                                    345 Park Avenue,
                                    <br/>
                                    New York, NY 10034
                                </Col>
                            </Col>
                            <h11>&nbsp;</h11>
                            <Col md={12} className={{display: 'inline-block'}}>
                                <Col md={6}>
                                    Emergency Contact 1:
                                    <br/>
                                    5 Park Avenue,
                                    <br/>
                                    New York, NY 10029
                                </Col>
                                <Col md={6}>
                                    Emergency Contact 2:
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
                                                       dataSort={true}>Time
                                    </TableHeaderColumn>
                                </BootstrapTable>
                                :
                                <div></div>
                            }
                        </Col>
                        <Col md={6}>
                            <h4>Responding To: {selectedEntry.resource} > {selectedEntry.issue}</h4>
                            <MapComponent
                                data={this.state.entryFromSameNumber}
                                location={this.state.location}
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