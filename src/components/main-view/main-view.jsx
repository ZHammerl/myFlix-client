// Utilities import

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

// Redux Action
import { setMovies, setUser, setUserData, setFavoriteMovies } from '../../actions/actions';

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

  getfavoriteMovies(token) {
    //User from redux store
    let user = this.props.user;
    axios
      .get(`https://my-movie-db22.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setFavoriteMovies(response.data.favoriteMovies);
      })
      .catch((e) => console.log(e));
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    this.props.setUserData(authData.user);

    localStorage.setItem('token', authData.token),
      localStorage.setItem('user', authData.user.Username),
      this.getMovies(authData.token);
    this.getfavoriteMovies(authData.token);
  }

  handleFav = (movieId, action) => {
    const { user, favoriteMovies } = this.props;
    const token = localStorage.getItem('token');
    if (token !== null && user !== null) {
      let url = `https://my-movie-db22.herokuapp.com/users/${user}/${movieId}`;
      // Add MovieID to Favorites (local state & webserver)
      if (action === 'add') {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(url, {}, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            alert(`Movie added to ${user} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === 'remove') {
        this.props.setFavoriteMovies(favoriteMovies.filter((id) => id !== movieId));
        axios
          .delete(`https://my-movie-db22.herokuapp.com/users/${user}/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            alert(`Movie removed from ${user} Favorite movies`);
            window.open(`/users/${user}`, '_self');
          })
          .catch((error) => console.error('removeFav Error ' + error));
      }
    }
  };

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getMovies(accessToken);
      this.getfavoriteMovies;
    }

    console.log(this.props);
  }
  render() {
    let { movies, user, userData, favoriteMovies } = this.props;
    console.log(this.props);
    return (
      <Router>
        <NavBar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center mx-auto ">
            <Route
              exact
              path="/"
              render={() => {
                /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0) return <div className="main-view">Loading...</div>;
                return <MoviesList movies={movies} />;
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
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
                if (!user) return <Redirect to="/" />;
                if (movies.length === 0) return <div className="main-view">Loading...</div>;
                return (
                  <Col md={8}>
                    <MovieView
                      handleFav={this.handleFav}
                      isFavorite={favoriteMovies.includes(match.params.movieId)}
                      movieData={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                if (movies.length === 0) return <div className="main-view">Loading...</div>;
                return (
                  <Col>
                    <DirectorView
                      director={movies.find((m) => m.Director.Name === match.params.name).Director}
                      directorMovies={movies.filter((m) => m.Director.Name === match.params.name)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                if (movies.length === 0) return <div className="main-view">Loading...</div>;
                return (
                  <Col>
                    <GenreView
                      genreMovies={movies.filter((m) => m.Genre.Name === match.params.name)}
                      genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                if (user.length === 0) return <div className="main-view">Loading...</div>;
                if (movies.length === 0) return <div className="main-view">Loading...</div>;
                return (
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                    handleFav={this.handleFav}
                    favoriteMovies={favoriteMovies || []}
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
    userData: state.userData,
    favoriteMovies: state.favoriteMovies,
  };
};

export default connect(mapStateToProps, { setMovies, setUser, setUserData, setFavoriteMovies })(
  MainView
);

MainView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
};
