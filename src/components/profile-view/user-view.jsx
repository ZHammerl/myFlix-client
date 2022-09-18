import React from 'react';
import {
  Row,
  Form,
  Col,
  Card,
  Container,
  Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';

export function UserView({
  user,
  birthday,
  toggleUpdateInfo,
  handleDelete,
}) {
  return (
    <Container className="mb-4">
      <Row>
        <h4 className="mb-3">
          Profile of <strong>{user.Username}</strong>
        </h4>
      </Row>
      <Row className="mb-3">
        <Col xs={12} sm={3}>
          Name:
        </Col>
        <Col>{user.Username}</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} sm={3}>
          Password:{' '}
        </Col>
        <Col>******</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} sm={3}>
          e-mail:
        </Col>
        <Col> {user.Email}</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} sm={3}>
          Birthday:{' '}
        </Col>
        <Col>{birthday}</Col>
      </Row>
      <Button
        className="mb-3 mr-3"
        type="button"
        onClick={handleDelete}>
        <strong> Delete </strong> my profile
      </Button>
      <Button
        className="mb-3"
        type="button"
        onClick={toggleUpdateInfo}>
        <strong>Edit </strong> my profile
      </Button>
    </Container>
  );
}
