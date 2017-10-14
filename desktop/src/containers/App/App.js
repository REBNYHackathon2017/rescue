import React, {Component} from 'react';
import MapContainer from '../Main/MapContainer';
import logo from '../../assets/Asset_3_logo.svg';
import './App.css';
import {IndexLink} from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
import {Navbar, NavBrand, Nav, NavItem, CollapsibleNav, NavDropdown, MenuItem} from 'react-bootstrap';

export default class App extends Component {

//     return (
// <div className="App">
// <header className="App-header">
// <img src={logo} className="App-logo" alt="logo"/>
// <h1 className="App-title">Welcome to React</h1>
// </header>
// <MapContainer />
// </div>
// );


    render() {

        return (
            <div>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img src={logo} className="App-logo" alt="logo"/>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">Link</NavItem>
                            <NavItem eventKey={2} href="#">Link</NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">Link Right</NavItem>
                            <NavItem eventKey={2} href="#">Link Right</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
