import React from 'react'
import { useSelector } from 'react-redux';
import { Container, Navbar, Nav, Dropdown, Image, NavLink, NavItem } from "react-bootstrap"

const NavBar = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  const dataUser = useSelector((state) => state.user.dataUser);
  console.log(isLogin);
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
            <Nav.Item className="d-flex align-items-center">
              <p className='fs6 mb-0 me-3'>
                {isLogin ? dataUser[0].nama : "Guest"}
              </p>
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