import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row } from 'react-bootstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';
import './movie-view.scss';

export function MovieView({ user, movieData, onBackClick }) {
  const addFav = (id) => {
    const token = localStorage.getItem('token');
    let url = `https://my-movie-db22.herokuapp.com/users/${user}/${id}`;
    axios.post(url, { headers: { Authorization: `Bearer ${token}` } }).then(() => {
      window.open(`/movies/${id}`, '_self');
    });
  };
  return (
    <Card className="movie-view mb-3">
      <Card.Header>
        <Card.Img variant="top" src={movieData.Imageurl} />
      </Card.Header>
      <Card.Body>
        <Card.Title className="cardText">
          {' '}
          {movieData.Title}{' '}
          <Button
            className="button-fav"
            onClick={() => {
              addFav(`${movieData._id}`);
            }}>
            🤍
          </Button>
        </Card.Title>

        <Card.Text className="cardText"> {movieData.Description}</Card.Text>
        <Card.Text className="cardText"> Actors: {movieData.Actors.join(', ')}</Card.Text>
        <Card.Text className="cardText">
          {' '}
          Director:{' '}
          <Link to={`/directors/${movieData.Director.Name}`}>{movieData.Director?.Name}</Link>
        </Card.Text>
        <Card.Text className="cardText">
          {' '}
          Genre: <Link to={`/genres/${movieData.Genre.Name}`}>{movieData.Genre?.Name}</Link>
        </Card.Text>
      </Card.Body>
      <Button
        onClick={() => {
          onBackClick();
        }}>
        Back
      </Button>
    </Card>
  );
}
MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Imageurl: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthyear: PropTypes.string,
      // Deathyear: PropTypes.string,
      Movies: PropTypes.array,
    }),
    Actors: PropTypes.array,
    Featured: PropTypes.bool,
  }).isRequired,
};
