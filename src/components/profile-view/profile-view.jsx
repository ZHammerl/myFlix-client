import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Row, Container } from 'react-bootstrap';
import { FavoriteView } from './favorite-view';
import { UserView } from './user-view';
import UserUpdate from './user-update';

import { connect } from 'react-redux';

import {
  updateUser,
  deleteUser,
} from '../../actions/actions';

export function ProfileView(props) {
  const {
    movies,
    handleFav,
    user,
    updateUser,
    deleteUser,
  } = props;
  const { Username, Birthday, FavoriteMovies } = user;

  const handleDelete = () => {
    if (Username && token) {
      let sure = confirm(
        'Are you sure? This action is irreversible and will ERASE your account.'
      );
      if (!sure) return;
      // request to Delete user from webserver
      axios
        .delete(
          `https://my-movie-db22.herokuapp.com/users/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          alert(
            `The account ${Username} was successfully deleted.`
          );
          localStorage.clear();
          deleteUser({});
          window.open('/register', '_self');
        })
        .catch((error) =>
          console.error('handleDelete Error ' + error)
        );
    }
  };

  const token = localStorage.getItem('token');

  const formattedBday = new Date(Birthday);
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
  const birthdayYYYYMMDD =
    formatDateYYYYMMDD(formattedBday);

  const handleUpdateUser = (updatedUser, token) => {
    if (Username && updatedUser && token) {
      axios
        .put(
          `https://my-movie-db22.herokuapp.com/users/${Username}`,
          { ...updatedUser },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const data = response.data;
          // update store user
          updateUser({ ...updatedUser, FavoriteMovies });
          localStorage.setItem(
            'user',
            updatedUser.Username
          );
          alert('Profile is updated!');
          window.open(
            `/users/${updatedUser.Username}`,
            '_self'
          );
        })
        .catch((err) => {
          console.error('error updating user:', err);
        });
    }
  };

  // for Button to switch from UserView to UpdateView
  const [updateInfo, setUpdateInfo] = useState(false);
  const toggleUpdateInfo = () => {
    setUpdateInfo(!updateInfo);
  };

  if (!user)
    return <div className="main-view">Loading...</div>;
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
          handleUpdateUser={handleUpdateUser}
          birthday={birthdayYYYYMMDD}
          toggleUpdateInfo={toggleUpdateInfo}></UserUpdate>
      )}

      <h4>My favorite movies:</h4>
      {FavoriteMovies.length !== 0 ? (
        <Row className="d-flex align-item-stretch mt-3">
          {FavoriteMovies.map((movieId) => {
            let movie = movies.find(
              (m) => m._id === movieId
            );
            return (
              <FavoriteView
                handleFav={handleFav}
                key={movieId}
                movieData={movie}
                token={token}>
                {' '}
                {movie.Title}
              </FavoriteView>
            );
          })}
        </Row>
      ) : (
        <h6 className="subtitle">
          You don't have any movies in your favorite movies
          list yet. Go to{' '}
          <Button href="/"> Movie List</Button> to add
          movies to your favorite list
        </h6>
      )}
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  deleteUser,
  updateUser,
})(ProfileView);
