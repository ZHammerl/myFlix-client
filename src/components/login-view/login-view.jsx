import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr(
        'Username must be at least 2 characters long'
      );
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr(
        'Password must be at least 6 characters long'
      );
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    if (isReq) {
      /*Send a request to the server for authentication*/
      /* then call props.onLoggedIn(username), which provides the username to our parent component (child to parent communication)*/
      axios
        .post('https://my-movie-db22.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          // response from the server incl. token
          const data = response.data;
          console.log(data);
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log('no such user');
          alert(
            'username and/or password are wrong or the user does not exist yet'
          );
        });
    }
    console.log(username, password);
  };

  return (
    <Form>
      <Form.Group as={Row} controlId="formUsername">
        <Form.Label column sm="12" for="username">
          Username:
        </Form.Label>
        <Col sm="10" md={6}>
          <Form.Control
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameErr && <p>{usernameErr}</p>}
        </Col>
      </Form.Group>
      <Form.Group
        as={Row}
        className="mb-3"
        controlId="formPassword">
        <Form.Label column sm="12" for="password">
          Password:
        </Form.Label>{' '}
        <Col sm="10" md={6}>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr && <p>{passwordErr}</p>}
        </Col>
      </Form.Group>
      <Button
        className="mr-3"
        type="submit"
        onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
