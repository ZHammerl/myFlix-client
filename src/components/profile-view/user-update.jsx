import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

export function UserUpdate({ user, updateUser }) {
  return (
    <Container className="profile-view">
      <Form column="true">
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={2}>
            Username:
          </Form.Label>
          <Col>
            <Form.Control
              variant="success"
              type="text"
              name="username"
              defaultValue={user.Username}
              onChange={(e) => updateUser(e.target.value)}></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={2}>
            Password:
          </Form.Label>
          <Col>
            <Form.Control
              variant="success"
              type="text"
              defaultValue={user.Password}
              onChange={(e) => updateUser(e.target.value)}></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={2}>
            E-Mail:
          </Form.Label>
          <Col>
            <Form.Control
              variant="success"
              type="email"
              defaultValue={user.Email}
              onChange={(e) => updateUser(e.target.value)}></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={2}>
            Birthday:
          </Form.Label>
          <Col>
            <Form.Control
              variant="success"
              type="date"
              defaultValue={user.Birthday}
              onChange={(e) => updateUser(e.target.value)}></Form.Control>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}
