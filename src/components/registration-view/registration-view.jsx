import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView({ onRegistration1 }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birth_date, setBirthdate] = useState('');
  const [email, setEmail] = useState('');

  // hooks for user inputs
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    birth_dateErr: '',
    emailErr: '',
  });

  // user validation
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username is required' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({ ...values, usernameErr: 'Username must be at least 2 characters long' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password is required.' });
      isReq = false;
    } else if (password < 6) {
      setValues({ ...values, passwordErr: 'Password must be at least 6 characters long' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email is required.' });
      isReq = false;
    } else if (email.indexOf('@') < 1) {
      setValues({ ...values, emailErr: 'Email is invalid' });
      isReq = false;
    }
    return isReq;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://my-movie-db22.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birth_date: birth_date,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please log in!');
          window.open('/', '_self'); //'_self' is necessary so that the page opens in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert('unable to register');
        });
    }
  };

  const handleLoginPage = (e) => {
    e.preventDefault();
    onRegistration1('nothing');
  };
  return (
    <Form className="justify-content-sm-center">
      <Form.Group as={Row} controlId="formUsername" className="reg-form-inputs">
        <Form.Label column="true" sm="12">
          Username:
        </Form.Label>
        <Col sm="6">
          <Form.Control
            variant="success"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {values.usernameErr && <p>{values.usernameErr}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPassword" className="reg-form-inputs">
        <Form.Label column="true" sm="12">
          Password:
        </Form.Label>
        <Col sm="6">
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {values.passwordErr && <p>{values.passwordErr}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formEmail" className="reg-form-inputs">
        <Form.Label column="true" sm="12">
          E-Mail:
        </Form.Label>
        <Col sm="6">
          <Form.Control
            column="true"
            sm="6"
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {values.emailErr && <p>{values.passwordErr} </p>}
        </Col>
      </Form.Group>
      <Form.Group className="mb-3 reg-form-inputs" as={Row} controlId="formBirth_date">
        <Form.Label column="true" sm="12">
          Birth date:
        </Form.Label>
        <Col sm="6">
          <Form.Control
            type="date"
            value={birth_date}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Button type="button" className="mr-3" onClick={handleSubmit}>
        Register
      </Button>
      <Button type="button" onClick={handleLoginPage}>
        Log In instead
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};
