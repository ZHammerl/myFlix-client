import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { FavoriteMovies } from './favorite-movies';
import { UserView } from './user-view';
import { UserUpdate } from './user-update';

export function ProfileView({ movies, onBackClick }) {
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');

  // hooks for user inputs
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    birthdayErr: '',
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

  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios
      .get(`https://my-movie-db22.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setUsername(response.data.Username);
        setFavoriteMovies(response.data.FavoriteMovies);
        setPassword(response.data.Password);
        setEmail(response.data.Email);
        setBirthday(response.data.Birthday);
      })
      .catch((error) => console.error('getUser Error ' + error));
  };

  useEffect(() => {
    getUser();
  }, []);

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
            Birthday: birthday,
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
        });
    }
  };

  const handleDelete = () => {
    if (user && token) {
      let sure = confirm('Are you sure? This action is irreversible and will ERASE your account.');
      if (!sure) return;
      // request to Delete user from webserver
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
    }
  };

  console.log(user._id);
  return (
    <Container className="profile-view">
      <UserView user={currentUser}></UserView>
      <UserUpdate user={user}></UserUpdate>
      <Button className="mb-3" type="button" onClick={handleDelete}>
        <strong> Delete </strong> my profile
      </Button>
      <Button className="mb-3" type="button" onClick={updateUser}>
        <strong>Update </strong> my profile
      </Button>
      <h4>My favorite movies:</h4>
      {favoriteMovies.length !== 0 ? (
        <Row className="justify-content mt-3">
          {favoriteMovies.map((movieId) => {
            let movie = movies.find((m) => m._id === movieId);
            return (
              <FavoriteMovies
                key={movieId}
                movieData={movie}
                user={currentUser}
                token={token}></FavoriteMovies>
            );
          })}
        </Row>
      ) : (
        <h6 className="subtitle">
          You don't have movies in your favorite movies list yet. Got to{' '}
          <Button href="/"> Movie List</Button> to add movies to your favorite list
        </h6>
      )}
    </Container>
  );
}
