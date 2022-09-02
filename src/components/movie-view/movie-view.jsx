import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
    const { movie, onBackClick } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.Imageurl} />
        <Card.Body>
          <Card.Title> {movie.Title}</Card.Title>
          <Card.Text> {movie.Description}</Card.Text>
          <Card.Text> Actors: {movie.Actors}</Card.Text>
          <Card.Text> Director: {movie.Director?.Name}</Card.Text>
          <Card.Text> Genre: {movie.Genre?.Name}</Card.Text>
        </Card.Body>
        <Button
          onClick={() => {
            onBackClick(null);
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
      Birthyear: PropTypes.number,
      Deathyear: PropTypes.number,
      Movies: PropTypes.array,
    }),
    Actors: PropTypes.array,
    Featured: PropTypes.bool,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
