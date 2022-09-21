import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardGroup,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import './movie-view.scss';

export function MovieView({
  movieData,
  onBackClick,
  handleFav,
  isFavorite,
}) {
  return (
    <CardGroup className="mb-3">
      {' '}
      <Card className="movie-poster">
        <Card.Body>
          <Card.Img
            variant="top"
            src={movieData.Imageurl}
            alt="Poster from the movie"
          />
        </Card.Body>
      </Card>
      <Card className="movie-info">
        <Card.Body>
          <Card.Title className="cardText mb-4">
            {' '}
            {movieData.Title}{' '}
            {!isFavorite ? (
              <Button
                className="button-fav"
                onClick={() =>
                  handleFav(movieData._id, 'add')
                }>
                🤍
              </Button>
            ) : (
              <div className="fav">🤍</div>
            )}
          </Card.Title>

          <Card.Text className="cardText">
            {' '}
            {movieData.Description}
          </Card.Text>
          <Card.Text className="cardText">
            {' '}
            Actors: {movieData.Actors.join(', ')}
          </Card.Text>
          <Card.Text className="cardText">
            {' '}
            Director:{' '}
            <Link
              to={`/directors/${movieData.Director.Name}`}>
              {movieData.Director?.Name}
            </Link>
          </Card.Text>
          <Card.Text className="cardText">
            {' '}
            Genre:{' '}
            <Link to={`/genres/${movieData.Genre.Name}`}>
              {movieData.Genre?.Name}
            </Link>
          </Card.Text>
          <Button
            className="fav"
            onClick={() => {
              onBackClick();
            }}>
            Back
          </Button>
        </Card.Body>
      </Card>
    </CardGroup>
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
