import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /*Send a request to the server for authentication*/
    /* then call props.onLoggedIn(username)*/
    props.onLoggedIn(username);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    props.onRegistration('');
  };

  return (
    <Form>
      <Form.Group as={Row}  controlId="formUsername">
        <Form.Label column sm="12">Username:</Form.Label>
        <Col sm="6">
          <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPassword">
        <Form.Label column sm="12">Password:</Form.Label>{' '}
        <Col sm="6">
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
        </Col>
      </Form.Group>
      <Button className="mr-3" type="submit" onClick={handleSubmit}>
        Submit
      </Button>

      <Button type="button" onClick={handleRegistration}>
        Register
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
