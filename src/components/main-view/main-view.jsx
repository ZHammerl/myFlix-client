// Utilities import

import React from 'react';
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
  setAllUsers,
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
import ProfileView from '../profile-view/profile-view';

import { UserService } from '../../services/user-services';
import { MovieService } from '../../services/movie-services';

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
    }
  }

  getMovies(token) {
    const movieService = new MovieService(token);
    if (token !== null) {
      movieService.getAllMovies(
        {},
        (response) => {
          this.props.setMovies(response.data);
        },
        (error) => {
          console.error(
            'getAllMovies Err MovieService ' + error
          );
        }
      );
    }
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
    const userService = new UserService(token);
    if (token !== null && user !== null) {
      userService.getOneUser(
        { user },
        (response) => {
          this.props.setUser(response.data);
        },
        (error) => {
          console.error('getUser Err UserService ' + error);
        }
      );
    }
  }

  // adding or removing a favorite movie
  handleFav = (movieId, action) => {
    const { user } = this.props;
    const { Username } = user;
    const token = localStorage.getItem('token');
    const userService = new UserService(token);
    if (token !== null && Username !== null) {
      // Add MovieID to Favorites (local state & webserver)
      if (action === 'add') {
        this.props.addFavorite(movieId);
        userService.addFavoriteMovie(
          { Username, movieId },
          () =>
            alert(
              `Movie added to ${Username} Favorite movies`
            ),
          (error) =>
            this.errorCallback(
              error,
              'addFav Error UserService '
            )
        );
        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === 'remove') {
        this.props.deleteFavorite(movieId);
        userService.removeFavoriteMovie(
          { Username, movieId },
          (res) => {
            alert(`Movie removed from your favorites list`);
            window.open(`/users/${Username}`, '_self');
          },
          (error) => {
            console.error(
              'removeFav Error UserService' + error
            );
          }
        );
      }
    }
  };

  render() {
    const { user, movies } = this.props;
    const { Username, FavoriteMovies } = user;
    return (
      <Router>
        <NavBar fluid user={Username} />
        <Container fluid>
          <Row className="main-view-width justify-content-md-center mx-auto">
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
                  <MovieView
                    handleFav={this.handleFav}
                    isFavorite={FavoriteMovies.includes(
                      match.params.movieId
                    )}
                    movieData={movies.find(
                      (m) => m._id === match.params.movieId
                    )}
                    onBackClick={() => history.goBack()}
                  />
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
    allUsers: state.allUsers,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUser,
  setAllUsers,
  addFavorite,
  deleteFavorite,
})(MainView);

// MainView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string,
//     password: PropTypes.string,
//   }),
// };
