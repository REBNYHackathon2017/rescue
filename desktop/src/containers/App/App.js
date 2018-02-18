import React, { Component } from 'react';
import logo from '../../assets/Asset_3_logo.svg';
import list from '../../assets/Asset_2_list.svg';
import main from '../../assets/Asset_4_map.svg';
import details from '../../assets/Asset_1_setting.svg';
import './App.css';
import { Navbar, Button } from 'react-bootstrap';
import axios from 'axios';
import { config } from '../../config';
const { backend } = config;


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            statusSort: 'all',
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } } = { coords: {} }) => {
            this.setState({ location: { lat: latitude, lng: longitude } });
        });
    }

    getAllReports = () => {
        return axios.get(`${backend}/api/reports/`)
            .then(result => 
                this.setState({
                    reports: result.data.sort((prev, curr) => curr.createdAt - prev.createdAt)
                })
            )
            .catch(err => console.log('failed to get reports!', err));
    };

    updateReportStatus = (entryId, newStatus) => {
        axios.put(`${backend}/api/reports/${entryId}`, { status: newStatus })
            .then(() => this.getAllReports())
            .catch(err => console.log('failed to update report status!', err));
    };

    updateStatusSort = (statusSort) => {
        this.setState({ statusSort });
    };

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a className="navbar-band" href="/main">
                                <img src={logo} alt="logo"/>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Form pullRight className="icon">
                            showing:
                            {'  '}
                            {(this.state.statusSort !== 'all') ?
                                <Button bsStyle="link" onClick={this.updateStatusSort.bind(this, 'all')}>all</Button>
                                :
                                <Button bsStyle="link" disabled>
                                    <b>
                                        <div className="selectedLink">all</div>
                                    </b>
                                </Button>
                            }
                            {'|'}
                            {(this.state.statusSort !== 'pending') ?
                                <Button bsStyle="link"
                                        onClick={this.updateStatusSort.bind(this, 'pending')}>pending</Button>
                                :
                                <Button bsStyle="link" disabled>
                                    <b>
                                        <div className="selectedLink">
                                            pending
                                        </div>
                                    </b></Button>
                            }
                            {'|'}
                            {(this.state.statusSort !== 'dispatched') ?
                                <Button bsStyle="link"
                                        onClick={this.updateStatusSort.bind(this, 'dispatched')}>dispatched</Button>
                                :
                                <Button bsStyle="link"
                                        disabled>
                                    <b>
                                        <div className="selectedLink">
                                            dispatched
                                        </div>
                                    </b>
                                </Button>
                            }
                            {'|'}
                            {(this.state.statusSort !== 'resolved') ?
                                <Button bsStyle="link"
                                        onClick={(this.updateStatusSort.bind(this, 'resolved'))}>resolved</Button>
                                :
                                <Button bsStyle="link"
                                        disabled>
                                    <b>
                                        <div className="selectedLink">
                                            resolved
                                        </div>
                                    </b>
                                </Button>
                            }
                            {'     '}
                            <a className="icon" href="/list">
                                <img src={list} alt="list"/>
                            </a>
                            <a className="icon" href="/main">
                                <img src={main} alt="main"/>
                            </a>
                            <a className="icon" href="/list">
                                <img src={details} alt="details"/>
                            </a>
                        </Navbar.Form>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    {this.props.children && React.cloneElement(this.props.children,
                        {
                            updateReportStatus: this.updateReportStatus,
                            getAllReports: this.getAllReports,
                            statusSort: this.state.statusSort,
                            reports: this.state.reports,
                            location: this.state.location
                        })
                    }
                </div>
            </div>
        );
    }
}
