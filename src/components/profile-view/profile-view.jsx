import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Row, Container } from 'react-bootstrap';
import { FavoriteMovies } from './favorite-movies';
import { UserView } from './user-view';
import { UserUpdate } from './user-update';

export function ProfileView({ movies, favoriteMovies, handleFav }) {
  const [user, setUser] = useState({
    Username: '',
    Password: '',
    FavoriteMovies: [],
    Birthday: '',
    Email: '',
  });

  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Birthday: '',
    Email: '',
  });

  const [updateInfo, setUpdateInfo] = useState(false);

  const toggleUpdateInfo = () => {
    setUpdateInfo(!updateInfo);
  };

  // hooks for user inputs
  const [errorMessage, setErrorMessage] = useState({
    usernameErr: '',
    passwordErr: '',
    birthdayErr: '',
    emailErr: '',
  });

  // user validation
  const validate = () => {
    let isReq = true;
    setErrorMessage((prevValue) => {
      return {
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        birthdayErr: '',
      };
    });
    if (!formData.Username) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, usernameErr: 'Username is required' };
      });
      isReq = false;
    } else if (formData.Username.length < 2) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, usernameErr: 'Username must be at least 2 characters long' };
      });
      isReq = false;
    }
    if (!formData.Password) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, passwordErr: 'Password is required.' };
      });
      isReq = false;
    } else if (formData.Password < 6) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, passwordErr: 'Password must be at least 6 characters long' };
      });
      isReq = false;
    }
    if (!formData.Email) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, emailErr: 'Email is required.' };
      });
      isReq = false;
    } else if (user.Email.indexOf('@') < 1) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, emailErr: 'Email is invalid' };
      });
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
      })
      .catch((error) => console.error('getUser Error ' + error));
  };

  useEffect(() => {
    getUser();
  }, []);

  const formattedBday = new Date(user.Birthday);
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join('.');
  }

  function formatDateYYYYMMDD(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
    ].join('-');
  }

  const birthdayFormatted = formatDate(formattedBday);
  const birthdayYYYYMMDD = formatDateYYYYMMDD(formattedBday);

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          `https://my-movie-db22.herokuapp.com/users/${user.Username}`,
          {
            Username: formData.Username,
            Password: formData.Password,
            Email: formData.Email,
            Birthday: formData.Birthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          localStorage.setItem('user', formData.Username);
          const data = response.data;
          console.log(data);
          alert('Profile is updated!');
          window.open(`/users/${formData.Username}`, '_self');
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

  console.log(user);
  if (!user) return <div className="main-view">Loading...</div>;
  return (
    <Container className="profile-view">
      {!updateInfo ? (
        <UserView
          user={user}
          birthday={birthdayFormatted}
          toggleUpdateInfo={toggleUpdateInfo}
          handleDelete={handleDelete}
        />
      ) : (
        <UserUpdate
          user={user}
          setUser={setUser}
          formData={formData}
          setFormData={setFormData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          birthday={birthdayYYYYMMDD}
          handleSubmitUpdate={handleSubmitUpdate}
          toggleUpdateInfo={toggleUpdateInfo}></UserUpdate>
      )}

      <h4>My favorite movies:</h4>
      {user.FavoriteMovies.length !== 0 ? (
        <Row className="justify-content mt-3">
          {user.FavoriteMovies.map((movieId) => {
            let movie = movies.find((m) => m._id === movieId);
            return (
              <FavoriteMovies
                handleFav={handleFav}
                key={movieId}
                movieData={movie}
                user={user}
                token={token}></FavoriteMovies>
            );
          })}
        </Row>
      ) : (
        <h6 className="subtitle">
          You don't have any movies in your favorite movies list yet. Got to{' '}
          <Button href="/"> Movie List</Button> to add movies to your favorite list
        </h6>
      )}
    </Container>
  );
}
