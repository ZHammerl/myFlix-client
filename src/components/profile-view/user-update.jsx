import React from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

import { setUser, setFavorites, setUserData } from '../../actions/actions';

export function UserUpdate({
  
  setFormData,
  formData,
  handleSubmitUpdate,
  birthday,
  toggleUpdateInfo,
  errorMessage,
}) {
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
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={3}>
            Username:
          </Form.Label>
          <Col>
            <Form.Control
              name="Username"
              type="text"
              placeholder={user.Username}
              value={formData.Username}
              onChange={onChangeHandleUpdate}
            />{' '}
            {errorMessage.usernameErr && (
              <p className="validation-message">{errorMessage.usernameErr}</p>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={3}>
            Password:
          </Form.Label>
          <Col>
            <Form.Control
              name="Password"
              type="text"
              placeholder="******"
              value={formData.Password}
              onChange={onChangeHandleUpdate}
            />{' '}
            {errorMessage.passwordErr && (
              <p className="validation-message">{errorMessage.passwordErr}</p>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={3}>
            E-Mail:
          </Form.Label>
          <Col>
            <Form.Control
              name="Email"
              type="email"
              placeholder={user.Email}
              value={formData.Email}
              onChange={onChangeHandleUpdate}
            />{' '}
            {errorMessage.emailErr && (
              <p className="validation-message">{errorMessage.emailErr} </p>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
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
      <Button className="mb-3 mr-3" type="button" onClick={(e) => handleSubmitUpdate(e)}>
        <strong>Update </strong> my profile
      </Button>
      <Button className="mb-3" type="button" onClick={() => toggleUpdateInfo()}>
        {' '}
        Back
      </Button>
    </Container>
  );
}
