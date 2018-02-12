import React, {Component, PropTypes} from 'react';
import io from 'socket.io-client';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router';
import AlertContainer from 'react-alert';
import phone from '../../assets/alert_phone.png';
const moment = require('moment-timezone');

export default class List extends Component {
    static propTypes = {
        getAllReports: PropTypes.func,
        updateReportStatus: PropTypes.func,
        data: PropTypes.array,
        statusSort:PropTypes.string,
    };

    componentDidMount() {
        const socket = io('backend');
        socket.on('create', data => {
            this.props.addReport(data);
            this.showAlert();
        });
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    alertOptions = {
        offset: 14,
        position: 'top left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    }
     
    showAlert = () => {
        this.msg.show('New Emergency Report', {
          time: 2000,
          type: 'error',
          icon: <img height="32" width="32" src={phone} />
        })
    }

    updateCellStatus = (entry) => {
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

        let formattedData = this.props.data.sort((prev, curr) => curr.createdAt - prev.createdAt).map((entry) => {
            return {
                id: entry.id,
                name: entry.name,
                location: entry.building,
                response: entry.resource,
                emergency: entry.issue,
                status: entry.status,
                time: moment(entry.createdAt).tz('America/New_York').format('MMMM Do YYYY, h:mm a'),
                createdAt: entry.createdAt,
            }
        });

        if (this.props.statusSort !== 'all') formattedData = formattedData.filter((entry) => entry.status === this.props.statusSort);

        const cellButton = (cell, row, enumObject, rowIndex) => {
            let theButton;

            if (row.status === 'pending') {
                theButton = <button className="button red"
                                    type="button"
                                    onClick={this.updateCellStatus.bind(this, row)}>
                    Dispatch
                </button>
            }
            if (row.status === 'dispatched') {
                theButton = <button className="button default"
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

        const tableOptions = {
            sortName: 'time',
            sortOrder: 'desc',
            sizePerPage: 11,
        };

        function sortTime(a, b, order) {   // order is desc or asc
            if (order === 'desc') {
                return moment(b.createdAt) - moment(a.createdAt);
            } else {
                return moment(a.createdAt) - moment(b.createdAt);
            }
        };

        return (
            <div className="container">
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <style>{require('./styleHack')}</style>
                <BootstrapTable data={formattedData}
                                headerStyle={ {color: "red"} }
                                striped={true}
                                hover={true}
                                options={tableOptions}
                                pagination
                                keyField="id">
                    <TableHeaderColumn dataField="name"
                                       dataSort={true} width="120">Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="location"
                                       dataSort={true}>Location
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="response"
                                       dataSort={true} width="100">Response
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="emergency"
                                       dataSort={true} width="130">Emergency
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="status"
                                       dataSort={true} width="130">Status
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="time"
                                       sortFunc={sortTime}
                                       dataSort={true} width="230">Time
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