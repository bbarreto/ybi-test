import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import Home from './Home';
import Countries from './Countries';
import Slot from './Slot';
import Sql from './Sql';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      menuIsOpen: false
    };
  }
  toggleMenu() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">YBI!Test</NavbarBrand>
          <NavbarToggler onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.menuIsOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/countries">Countries</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/slotmachine">Slot Machine</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/sql">SQL Part</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <div className="container py-3">
          <Router>
            <Home path="/" />
            <Countries path="countries" />
            <Slot path="slotmachine" />
            <Sql path="sql" />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
