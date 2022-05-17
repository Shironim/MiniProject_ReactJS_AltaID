import React from 'react'
import { Col, Container, Row, Navbar, Nav, NavDropdown, Form, FormControl, Button, Image, Dropdown, NavItem, NavLink } from "react-bootstrap"

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Music Player</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Item className="d-flex align-items-center">
              <p className='fs6 mb-0 me-3'>Dimas Seto</p>
            </Nav.Item>

            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>
                <Image
                  src={'https://github.com/mshaaban0.png'}
                  roundedCircle
                  style={{ width: "50px", height: "50px" }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <div>Logout</div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavBar;