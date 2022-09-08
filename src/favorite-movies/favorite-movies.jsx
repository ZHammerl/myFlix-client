import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function FavoriteMovies({ movieData }) {
  return (
    <Col
      xs={9}
      sm={{ span: 9, offset: 2 }}
      md={{ span: 5, offset: 0 }}
      lg={4}
      xl={3}
      className="mb-3">
      {' '}
      <Card>hello
        {/* <Link to={`/movies/${movieData._id}`}>
          <Card.Img className="poster position-relative" variant="top" src={movieData.Imageurl} />
        </Link>
        <Card.Body>
          <Card.Title className="cardText"> {movieData.Title}</Card.Title>
          <Card.Text className="cardText">
            {movieData.Description.length < 131 && movieData.Description}
            {movieData.Description.length > 130 && movieData.Description.substring(0, 130) + '...'}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-clr-footer">
          <Link to={`/movies/${movieData._id}`}>
            <Button variant="link">Show Details</Button>
          </Link>
        </Card.Footer> */}
      </Card>
    </Col>
  );
}
