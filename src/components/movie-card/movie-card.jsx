import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardGroup,
  Button,
  Col,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.jsx';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    return (
      <Col
        xs={12}
        md={6}
        lg={4}
        xl={3}
        className="mb-3 d-flex">
        <CardGroup>
          <Card border="light" className="mb-3">
            <Link to={`/movies/${movieData._id}`}>
              <Card.Img
                className="poster"
                variant="top"
                src={movieData.Imageurl}
                alt="Poster from the movie"
              />
            </Link>
            <Card.Body>
              <Card.Title className="cardText">
                {' '}
                {movieData.Title}
              </Card.Title>
              <Card.Text className="cardText">
                {movieData.Description.length < 131 &&
                  movieData.Description}
                {movieData.Description.length > 130 &&
                  movieData.Description.substring(0, 130) +
                    '...'}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-clr-footer">
              <Link to={`/movies/${movieData._id}`}>
                <Button variant="link">Show Details</Button>
              </Link>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Col>
    );
  }
}
// MovieCard.propTypes = {
//   movieData: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Imageurl: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birthyear: PropTypes.string,
//       Movies: PropTypes.array,
//     }),
//     Actors: PropTypes.array,
//     Featured: PropTypes.bool,
//   }).isRequired,
// };
