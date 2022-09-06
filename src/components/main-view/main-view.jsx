import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
  constructor() {
    super();
    // initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
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

  // Log-Out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }
  //When a user sucessfully registers
  onRegistration2(register) {
    this.setState({
      register,
    });
    console.log('onregistration2');
    console.log(this.state);
  }
  render() {
    const { movies, user, register } = this.state;
    // if (!register)
    //   return <RegistrationView onRegistration1={(register) => this.onRegistration2(register)} />;
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          </Col>
        </Row>
      );

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view">Loading...</div>;
    return (
      <Router>
        <Row className="main-view justify-content-md-center ">
          <Route
            exact
            path="/"
            render={() => {
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movieData={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="movies/:movieTitle"
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movieData={movies.find((m) => m.Title === match.params.movieTitle)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <button
            onClick={() => {
              this.onLoggedOut();
            }}>
            Logout
          </button>
        </Row>
      </Router>
    );
  }
}
