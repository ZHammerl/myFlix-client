import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

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
    <Navbar variant="dark">
      <Navbar.Brand className="navbar-logo" href="/">
        my Flix App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-bar">
          {getToken() && (
            <Nav.Link href="/">Movies</Nav.Link>
          )}
          {getToken() && (
            <Nav.Link href={`/users/${user}`}>
              {user}
            </Nav.Link>
          )}
          {!getToken() && (
            <Nav.Link href="/register">Sign up</Nav.Link>
          )}
          {!getToken() && (
            <Nav.Link href="/">Login</Nav.Link>
          )}
          {getToken() && (
            <Nav.Link
              className="logout"
              onClick={() => {
                onLoggedOut();
              }}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
