import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }
  //When a user sucessfully registers
  onRegistration2(register) {
    this.setState({
      register,
    });
  }
  render() {
    const { movies, selectedMovie, user, register } = this.state;
    if (!register)
      return <RegistrationView onRegistration1={(register) => this.onRegistration2(register)} />;
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return (
        <LoginView
          onRegistration={()=>this.onRegistration2()}
          onLoggedIn={(user) => this.onLoggedIn(user)}
        />
      );
    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view">Loading...</div>;
    return (
      <Row className="main-view justify-content-md-center ">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col sm={12} md={4} lg= {3}>
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
  componentDidMount() {
    axios
      .get('https://my-movie-db22.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
