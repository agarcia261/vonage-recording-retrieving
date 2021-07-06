import React from "react";
import "./style.css";
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import logo from '../../logo.svg';

function NavBar(props) {
  return (
    <Navbar bg="primary" variant="dark">
     <Navbar.Brand href="#home">
      <img
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    </Form>
  </Navbar>
  );
}
export default NavBar;
