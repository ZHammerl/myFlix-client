import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavBar } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UserUpdate } from '../user-update/user-update';

import { Container, Row, Col } from 'react-bootstrap';
import { useSSRSafeId } from '@react-aria/ssr';

export class MainView extends React.Component {
  constructor() {
    super();
    // initial state is set to null
    this.state = {
      movies: [],
      user: null,
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://my-movie-db22.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem('token', authData.token),
      localStorage.setItem('user', authData.user.Username),
      this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <NavBar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center ">
            <Route
              exact
              path="/"
              render={() => {
                /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
                if (!user)
                  return (
                    <Col>
                      <LoginView movies={movies} onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0) return <div className="main-view">Loading...</div>;

                return movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movieData={m} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/registration"
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
                return (
                  <Col md={8}>
                    <MovieView
                      movieData={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/director/:name"
              render={({ match, history }) => {
                return (
                  <Col md={8}>
                    <DirectorView
                      movieData={movies.find((m) => m.Director.Name === match.params.name)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genre/:name"
              render={({ match, history }) => {
                return (
                  <Col>
                    <GenreView
                      movieData={movies.find((m) => m.Genre.Name === match.params.name)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users/${user}`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
            <Route
              path={`/user-update/${user}`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <UserUpdate user={user} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
