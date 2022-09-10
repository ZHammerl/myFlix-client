import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

export function UserUpdate({
  user,
  setUser,
  setFormData,
  formData,
  handleSubmitUpdate,
  birthday,
  toggleUpdateInfo,
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
          <Form.Label column="true" xs={2}>
            Username:
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="user.Username"
              placeholder={user.Username}
              value={formData.Username}
              onChange={onChangeHandleUpdate}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={2}>
            Password:
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="user.Password"
              placeholder="******"
              value={formData.Password}
              onChange={onChangeHandleUpdate}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={2}>
            E-Mail:
          </Form.Label>
          <Col>
            <Form.Control
              name="user.E.Mail"
              type="email"
              placeholder={user.Email}
              value={formData.Email}
              onChange={onChangeHandleUpdate}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={2}>
            Birthday:
          </Form.Label>
          <Col>
            <Form.Control
              type="date"
              name="user.Birthday"
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
