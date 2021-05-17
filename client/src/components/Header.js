import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../store/actions/adminActions';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.adminLogin);

  const logoutHandler = () => {
    dispatch(adminLogout());
    history.push('/');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Mailer</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {adminInfo.email ? (
                <>
                  <NavDropdown title={adminInfo.email} id="username">
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <LinkContainer to="/admin/dashboard">
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <LinkContainer to="/admin/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Admin Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
