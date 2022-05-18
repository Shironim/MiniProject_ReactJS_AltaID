import React from 'react'
import { Container, Navbar, Nav } from "react-bootstrap"

const NavBar = () => {
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">musik.in</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavBar;