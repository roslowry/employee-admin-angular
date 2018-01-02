import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';


export default function (){

  const navbarInstance = (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand style={{fontSize: '23px'}}>Employee Tracker</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    </Navbar>
  );
  return navbarInstance
}
