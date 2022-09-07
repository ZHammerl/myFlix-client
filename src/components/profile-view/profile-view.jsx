import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [password, setPassword] = useState(props.password);
  const [email, setEmail] = useState(props.email);
  const [birth_date, setBirth_date] = useState(props.birth_date);

  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const handleDelete = () => {
    axios
      .delete(`https://my-movie-db22.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`The account ${currentUser} was successfully deleted.`);
        localStorage.clear();
        window.open('/register', '_self');
      })
      .catch((error) => console.error(error));
  };
  console.log(user.Username);
  console.log(props);
  return (
    <Container className="profile-view">
      <Form.Group as={Row} controlId="formUsername">
        <Form.Label column="true">Username:</Form.Label>
        <Col>
          <Form.Control variant="success" type="text" defaultValue={currentUser}></Form.Control>
        </Col>
      </Form.Group>
      <Button onClick={handleDelete}>Delete</Button>
    </Container>
  );
}
