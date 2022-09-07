import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardGroup, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.jsx';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    return (
      <CardGroup>
        <Card border="light" className="mb-3">
          <Card.Img variant="top" src={movieData.Imageurl} />
          <Card.Body>
            <Card.Title> {movieData.Title}</Card.Title>
            <Card.Text>
              {movieData.Description.length < 131 && movieData.Description}
              {movieData.Description.length > 130 &&
                movieData.Description.substring(0, 130) + '...'}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="bg-clr-footer">
            <Link to={`/movies/${movieData._id}`}>
              <Button variant="link">Show Details</Button>
            </Link>
          </Card.Footer>
        </Card>
      </CardGroup>
    );
  }
}
MovieCard.propTypes = {
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
      Deathyear: PropTypes.string,
      Movies: PropTypes.array,
    }),
    Actors: PropTypes.array,
    Featured: PropTypes.bool,
  }).isRequired,
};
