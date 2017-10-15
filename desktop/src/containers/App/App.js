import React, {Component} from 'react';
import logo from '../../assets/Asset_3_logo.svg';
import list from '../../assets/Asset_2_list.svg';
import main from '../../assets/Asset_4_map.svg';
import details from '../../assets/Asset_1_setting.svg';
import search from '../../assets/Asset_12_search.svg';
import './App.css';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';

export default class App extends Component {

    componentWillMount() {
        return axios.get(`http://18.216.36.119:3002/api/reports/`)
            .then((result) => this.setState({data: result.data}));
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [{}],
        }
    }

    addReport(newReport) {
        this.setState(prevState => ({
            data: prevState.slice().push(newReport)
        }));
    }

    getAllReports = () => {
        return axios.get(`http://18.216.36.119:3002/api/reports/`)
            .then((result) => this.setState({data: result.data.sort((prev, curr) => curr.createdAt - prev.createdAt)}));
    };

    updateReportStatus = (entryId, nextStatus) => {
        return axios.put(`http://18.216.36.119:3002/api/reports/${entryId}`, {status: nextStatus})
            .then(() => this.getAllReports())
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
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Search"/>
                            </FormGroup>
                            {' '}
                            <Button type="submit"><img src={search} alt="search"/></Button>
                        </Navbar.Form>
                        <Navbar.Form pullRight className="icon">
                            showing:
                            {'  '}
                            <Navbar.Link href="#">all</Navbar.Link>
                            {'  |  '}
                            <Navbar.Link href="#">pending</Navbar.Link>
                            {'  |  '}
                            <Navbar.Link href="#">dispatch</Navbar.Link>
                            {'  |  '}
                            <Navbar.Link href="#">resolved</Navbar.Link>
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
                    {this.props.children && React.cloneElement(this.props.children, {updateReportStatus: this.updateReportStatus, addReport: this.newReport, getAllReports: this.getAllReports, data: this.state.data})}
                </div>
            </div>
        );
    }
}
