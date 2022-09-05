import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './registration-view.scss';

export function RegistrationView({ onRegistration1 }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birth_date, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, birth_date, email);
    /*Send a request to the server for authentication*/
    /* then call props on registered user*/
    onRegistration1(username);
  };
  const handleLoginPage = (e) => {
    e.preventDefault();
    onRegistration1('nothing');
  };
  return (
    <Form className="justify-content-sm-center">
      <Form.Group as={Row} controlId="formUsername">
        <Form.Label column="true" sm="12">
          Username:
        </Form.Label>
        <Col sm="6">
          <Form.Control
            variant="success"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPassword">
        <Form.Label column="true" sm="12">
          Password:
        </Form.Label>
        <Col sm="6">
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formEmail">
        <Form.Label column="true" sm="12">
          E-Mail:
        </Form.Label>
        <Col sm="6">
          <Form.Control
            column="true"
            sm="6"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3" as={Row} controlId="formBirth_date">
        <Form.Label column="true" sm="12">
          Birth date:
        </Form.Label>
        <Col sm="6">
          <Form.Control type="date" onChange={(e) => setBirthdate(e.target.value)} />
        </Col>
      </Form.Group>
      <Button type="button" className="mr-3" onClick={handleSubmit}>
        Submit
      </Button>
      <Button type="button" onClick={handleLoginPage}>
        Log In
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegistration1: PropTypes.func.isRequired,
};
