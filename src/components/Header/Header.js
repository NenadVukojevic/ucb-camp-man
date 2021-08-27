import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import logo from '../../images/logo.png'
import './Header.css'

function Header() {
    return (

        <Navbar className="navbar-custom" bg="dark" variant="dark"  fixed="top" >
            
                <Navbar.Brand href="/"><img src={logo} alt="logo"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/campaigns">ON US Campaigns</Nav.Link>
                        <NavDropdown title="OFF US Campaigns" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/campaignsOff">Campaigns</NavDropdown.Item>
                            <NavDropdown.Item href="/responses">Responses</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/terminalGroup">Terminal Group</NavDropdown.Item>
                            <NavDropdown.Item href="/binRangeGroup">BinRange Group</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/terminals">Terminals</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            
        </Navbar>


    )
}

export default Header
