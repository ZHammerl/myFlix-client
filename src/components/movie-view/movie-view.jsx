import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }
  render() {
    const { movieData, onBackClick } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movieData.Imageurl} />
        <Card.Body>
          <Card.Title> {movieData.Title}</Card.Title>
          <Card.Text> {movieData.Description}</Card.Text>
          <Card.Text> Actors: {movieData.Actors}</Card.Text>
          <Card.Text> Director: {movieData.Director?.Name}</Card.Text>
          <Card.Text> Genre: {movieData.Genre?.Name}</Card.Text>
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
}
MovieView.propTypes = {
  movie: PropTypes.shape({
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
