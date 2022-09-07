import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function NavBar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };
  const getToken = () => {
    let userToken = localStorage.getItem('token');
    return userToken ? userToken : false;
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          my Flix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-bar">
            {getToken() && <Nav.Link href="/">Movies</Nav.Link>}
            {getToken() && <Nav.Link href={`/users/${user}`}>My Profile</Nav.Link>}
            {!getToken() && <Nav.Link href="/register">Sign up</Nav.Link>}
            {!getToken() && <Nav.Link href="/">Login</Nav.Link>}
            {getToken() && (
              <Nav.Link
                onClick={() => {
                  onLoggedOut();
                }}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
