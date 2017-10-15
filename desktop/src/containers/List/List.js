import React, {Component, PropTypes} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router';
import axios from 'axios';

export default class List extends Component {
    static propTypes = {
        getAllReports: PropTypes.func,
        updateReportStatus: PropTypes.func,
        data: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    // goToDetail = (entry) => {
    //     this.goToState(entry.id);
    // };

    updateCellStatus = (entry) => {
        console.log('entry being passe in function updateCellStatus', entry);
        let nextStatus;

        switch (entry.status) {
            case 'pending':
                nextStatus = 'dispatched';
                break;
            case 'dispatched':
                nextStatus = 'resolved';
                break;
            default:
                nextStatus = 'dispatched';
        }

        return this.props.updateReportStatus(entry.id, nextStatus);
    };

    render() {
        const styles = require('./List.scss');

        const formattedData = this.props.data.sort((prev, curr) => curr.createdAt - prev.createdAt).map((entry) => {
            return {
                id: entry.id,
                name: entry.name,
                location: entry.building,
                response: entry.resource,
                emergency: entry.issue,
                status: entry.status,
                time: entry.createdAt,
            }
        });

        const cellButton = (cell, row, enumObject, rowIndex) => {
            let theButton;

            if (row.status === 'pending') {
                theButton = <button style={{backgroundColor: "#DE0A1A", width: "75px", color: "white", height: "30px"}}
                                    type="button"
                                    onClick={this.updateCellStatus.bind(this, row)}>
                    Dispatch
                </button>
            }
            if (row.status === 'dispatched') {
                theButton = <button style={{backgroundColor: "#808080", width: "75px", color: "white", height: "30px"}}
                                    type="button"
                                    onClick={this.updateCellStatus.bind(this, row)}>
                    Resolve
                </button>
            }

            return theButton;
        };

        const detailButton = (cell, row, enumObject, rowIndex) => {
            return (
                <Link className={styles.link}
                      to={`/list/${row.id}`}>Details ></Link>
            );
        };

        return (
            <div>
                <style>{require('./styleHack')}</style>
                <BootstrapTable data={formattedData}
                                headerStyle={ {color: "red"} }
                                striped={true}
                                hover={true}
                                pagination
                                keyField="id">
                    <TableHeaderColumn dataField="name"
                                       dataSort={true}>Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="location"
                                       dataSort={true}>Location
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="response"
                                       dataSort={true}>Response
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="emergency"
                                       dataSort={true}>Emergency
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="status"
                                       dataSort={true}>Status
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="time"
                                       dataSort={true}>Time
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="button"
                                       dataFormat={cellButton}
                                       dataAlign="center">Action
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="details"
                                       dataFormat={detailButton}
                                       dataAlign="center">
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    };
}