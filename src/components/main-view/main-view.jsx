// Utilities import

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';

// Redux Action
import {
  setMovies,
  setUser,
  addFavorite,
  deleteFavorite,
} from '../../actions/actions';

// Components imports
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { NavBar } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Container, Row, Col } from 'react-bootstrap';

class MainView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getMovies(accessToken);
      this.getUser(accessToken);
      console.log('componentDidMount');
    }
  }

  getMovies(token) {
    axios
      .get('https://my-movie-db22.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getUser(token) {
    const user = localStorage.getItem('user');
    axios
      .get(
        `https://my-movie-db22.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch((err) => {
        console.log('getUser Err', err);
      });
  }

  // adding or removing a favorite movie
  handleFav = (movieId, action) => {
    const { user } = this.props;
    const { Username } = user;
    const token = localStorage.getItem('token');
    let url = `https://my-movie-db22.herokuapp.com/users/${Username}/${movieId}`;
    if (token !== null && Username !== null) {
      // Add MovieID to Favorites (local state & webserver)
      if (action === 'add') {
        this.props.addFavorite(movieId);
        axios
          .post(
            url,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            alert(
              `Movie added to ${Username} Favorite movies`
            );
          })
          .catch((err) => {
            console.log(err);
          });
        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === 'remove') {
        this.props.deleteFavorite(movieId);
        axios
          .delete(url, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            alert(
              `Movie removed from ${Username} Favorite movies`
            );
            window.open(`/users/${Username}`, '_self');
          })
          .catch((error) =>
            console.error('removeFav Error ' + error)
          );
      }
    }
  };

  render() {
    const { user, movies } = this.props;
    const { Username, FavoriteMovies } = user;
    console.log(movies);
    return (
      <Router>
        <NavBar user={Username} />
        <Container>
          <Row className="main-view justify-content-md-center mx-auto ">
            <Route
              exact
              path="/"
              render={() => {
                /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
                if (!Username)
                  return (
                    <Col>
                      <LoginView
                        onLoggedIn={(Username) =>
                          this.onLoggedIn(Username)
                        }
                      />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0)
                  return (
                    <div className="main-view">
                      Loading...
                    </div>
                  );
                return <MoviesList movies={movies} />;
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (Username) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!Username) return <Redirect to="/" />;
                if (movies.length === 0)
                  return (
                    <div className="main-view">
                      Loading...
                    </div>
                  );
                return (
                  <Col md={8}>
                    <MovieView
                      handleFav={this.handleFav}
                      isFavorite={FavoriteMovies.includes(
                        match.params.movieId
                      )}
                      movieData={movies.find(
                        (m) =>
                          m._id === match.params.movieId
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!Username) return <Redirect to="/" />;
                if (movies.length === 0)
                  return (
                    <div className="main-view">
                      Loading...
                    </div>
                  );
                return (
                  <Col>
                    <DirectorView
                      director={
                        movies.find(
                          (m) =>
                            m.Director.Name ===
                            match.params.name
                        ).Director
                      }
                      directorMovies={movies.filter(
                        (m) =>
                          m.Director.Name ===
                          match.params.name
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!Username) return <Redirect to="/" />;
                if (movies.length === 0)
                  return (
                    <div className="main-view">
                      Loading...
                    </div>
                  );
                return (
                  <Col>
                    <GenreView
                      genreMovies={movies.filter(
                        (m) =>
                          m.Genre.Name === match.params.name
                      )}
                      genre={
                        movies.find(
                          (m) =>
                            m.Genre.Name ===
                            match.params.name
                        ).Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users/${Username}`}
              render={({ history }) => {
                console.log(Username);
                if (!Username) return <Redirect to="/" />;
                if (movies.length === 0)
                  return (
                    <div className="main-view">
                      Loading...
                    </div>
                  );
                return (
                  <ProfileView
                    user={user}
                    movies={movies}
                    onBackClick={() => history.goBack()}
                    handleFav={this.handleFav}
                  />
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUser,
  addFavorite,
  deleteFavorite,
})(MainView);

// MainView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string,
//     password: PropTypes.string,
//   }),
// };
