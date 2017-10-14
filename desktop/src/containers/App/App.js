import React, {Component} from 'react';
import logo from '../../assets/Asset_3_logo.svg';
import list from '../../assets/Asset_2_list.svg';
import main from '../../assets/Asset_4_map.svg';
import details from '../../assets/Asset_1_setting.svg';
import search from '../../assets/Asset_12_search.svg';
import './App.css';
import {IndexLink} from 'react-router';
import {Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button} from 'react-bootstrap';

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
                            {/*<LinkContainer to="/main">*/}
                                {/* <img src={logo} className="App-logo" alt="logo"/>   */}
                            {/*</LinkContainer>*/}
                            <a className="navbar-band" href="/main">
                                <img src={logo} alt="logo"/>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Search" />
                            </FormGroup>
                            {' '}
                            <Button type="submit"><img src={search} alt="search"/></Button>
                        </Navbar.Form>
                        <Nav pullRight>
                            <Navbar.Text>
                                showing:
                                {'  '}
                                <Navbar.Link href="#">all</Navbar.Link>
                                {'  |  '}
                                <Navbar.Link href="#">pending</Navbar.Link>
                                {'  |  '}
                                <Navbar.Link href="#">dispatch</Navbar.Link>
                                {'  |  '}
                                <Navbar.Link href="#">resolved</Navbar.Link>
                            </Navbar.Text>
                            <a className="icon" href="/list">
                                <img src={list} alt="list"/>
                            </a>
                            <a className="icon" href="/main">
                                <img src={main} alt="main"/>
                            </a>
                            <a className="icon" href="/details">
                                <img src={details} alt="details"/>
                            </a>
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
