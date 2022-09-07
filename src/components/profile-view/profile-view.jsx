import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [favoriteMovies, setFavoriteMovies] = useState(props.favoriteMovies);
  const [email, setEmail] = useState(props.email);
  const [birth_date, setBirth_date] = useState(props.birth_date);

  // hooks for user inputs
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    birth_dateErr: '',
    emailErr: '',
  });

  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios
      .get(`https://my-movie-db22.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error('getUser Error ' + error));
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = () => {
    axios
      .delete(`https://my-movie-db22.herokuapp.com/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted.`);
        localStorage.clear();
        window.open('/register', '_self');
      })
      .catch((error) => console.error('handleDelete Error ' + error));
  };

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

  const updateUser = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          `https://my-movie-db22.herokuapp.com/users/${user._id}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birth_date: birth_date,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); //'_self' is necessary so that the page opens in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert('unable to register');
        });
    }
  };

  console.log(user.Email);
  console.log(props);
  return (
    <Container className="profile-view">
      <Form.Group className="mt-3" as={Row} controlId="formUsername">
        <Form.Label column="true">Username:</Form.Label>
        <Col>
          <Form.Control variant="success" type="text" value={currentUser}></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group className="mt-3" as={Row} controlId="formUsername">
        <Form.Label column="true">Password:</Form.Label>
        <Col>
          <Form.Control variant="success" type="text" value="******"></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group className="mt-3" as={Row} controlId="formUsername">
        <Form.Label column="true">E-Mail:</Form.Label>
        <Col>
          <Form.Control variant="success" type="email" value={user.Email}></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group className="mt-3" as={Row} controlId="formUsername">
        <Form.Label column="true">Birthday:</Form.Label>
        <Col>
          <Form.Control variant="success" type="date" value={user.Birth_date}></Form.Control>
        </Col>
      </Form.Group>
      <Button type="button" onClick={handleDelete}>
        Delete
      </Button>
      <Button type="button" onClick={updateUser}>
        Update
      </Button>
    </Container>
  );
}
