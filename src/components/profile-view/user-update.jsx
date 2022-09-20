import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Col,
  Row,
  Container,
} from 'react-bootstrap';

import { connect } from 'react-redux';

import {
  setUser,
  setFavorites,
  setUserData,
} from '../../actions/actions';

export function UserUpdate({
  user,
  handleUpdateUser,
  birthday,
  toggleUpdateInfo,
}) {
  const [errorMessage, setErrorMessage] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  // user validation
  const validate = () => {
    let isReq = true;
    setErrorMessage((prev) => {
      return {
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        birthdayErr: '',
      };
    });
    if (!formData.Username) {
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          usernameErr: 'Username is required',
        };
      });
      isReq = false;
    } else if (formData.Username.length < 2) {
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          usernameErr:
            'Username must be at least 2 characters long',
        };
      });
      isReq = false;
    }
    if (!formData.Password) {
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          passwordErr: 'Password is required.',
        };
      });
      isReq = false;
    } else if (formData.Password < 6) {
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          passwordErr:
            'Password must be at least 6 characters long',
        };
      });
      isReq = false;
    }
    if (!formData.Email) {
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          emailErr: 'Email is required.',
        };
      });
      isReq = false;
    } else if (formData.Email.indexOf('@') < 1) {
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          emailErr: 'Email is invalid',
        };
      });
      isReq = false;
    }
    return isReq;
  };

  const [formData, setFormData] = useState({
    Username: user.Username,
    Password: '',
    Birthday: birthday,
    Email: user.Email,
  });

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const isReq = validate();
    if (isReq) {
      let updatedUser = {
        Username: formData.Username,
        Password: formData.Password,
        Email: formData.Email,
        Birthday: formData.Birthday,
      };
      handleUpdateUser(updatedUser, token);
    }
  };

  function onChangeHandleUpdate(e) {
    const { value, name } = e.target;
    console.log(value);
    setFormData((preFormData) => {
      return {
        ...preFormData,
        [name]: value,
      };
    });
  }

  return (
    <Container className="profile-view mb-4">
      <h4>Update your profile</h4>
      <Form column="true" className="mb-3">
        <Form.Group
          className="mt-3"
          as={Row}
          controlId="formUsername">
          <Form.Label column="true" xs={3}>
            Username:
          </Form.Label>
          <Col>
            <Form.Control
              name="Username"
              type="text"
              value={formData.Username}
              onChange={onChangeHandleUpdate}
            />{' '}
            {errorMessage.usernameErr && (
              <p className="validation-message">
                {errorMessage.usernameErr}
              </p>
            )}
          </Col>
        </Form.Group>
        <Form.Group
          className="mt-3"
          as={Row}
          controlId="formUsername">
          <Form.Label column="true" xs={3}>
            Password:
          </Form.Label>
          <Col>
            <Form.Control
              name="Password"
              type="text"
              placeholder="New password is required"
              value={formData.Password}
              onChange={onChangeHandleUpdate}
            />{' '}
            {errorMessage.passwordErr && (
              <p className="validation-message">
                {errorMessage.passwordErr}
              </p>
            )}
          </Col>
        </Form.Group>
        <Form.Group
          className="mt-3"
          as={Row}
          controlId="formUsername">
          <Form.Label column="true" xs={3}>
            E-Mail:
          </Form.Label>
          <Col>
            <Form.Control
              name="Email"
              type="email"
              value={formData.Email}
              onChange={onChangeHandleUpdate}
            />{' '}
            {errorMessage.emailErr && (
              <p className="validation-message">
                {errorMessage.emailErr}{' '}
              </p>
            )}
          </Col>
        </Form.Group>
        <Form.Group
          className="mt-3"
          as={Row}
          controlId="formUsername">
          <Form.Label column="true" xs={3}>
            Birthday:
          </Form.Label>
          <Col>
            <Form.Control
              name="Birthday"
              type="date"
              placeholder={birthday}
              value={formData.Birthday}
              onChange={onChangeHandleUpdate}
            />
          </Col>
        </Form.Group>
      </Form>
      <Button
        className="mb-3 mr-3"
        type="button"
        onClick={(e) => handleSubmitUpdate(e)}>
        <strong>Update </strong> my profile
      </Button>
      <Button
        className="mb-3"
        type="button"
        onClick={() => toggleUpdateInfo()}>
        {' '}
        Back
      </Button>
    </Container>
  );
}
