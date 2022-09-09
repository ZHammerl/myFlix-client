import axios from 'axios';
import React from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function FavoriteMovies({ movieData, token, user }) {
  const removeFav = (id) => {
    let url = `https://my-movie-db22.herokuapp.com/users/${user}/${id}`;
    axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
  };
  {favoriteMovies.map((movieId) => {
    let movie = movies.find((m) => m._id === movieId);
    return (
    <Col
      xs={12}
      sm={{ span: 9, offset: 2 }}
      md={{ span: 5, offset: 0 }}
      lg={4}
      xl={3}
      className="mb-3">
      {' '}
      <Card>
        <Link to={`/movies/${movieData._id}`}>
          <Card.Img className="poster position-relative" variant="top" src={movieData.Imageurl} />
          <Card.Body>
            <Card.Title className="cardText"> {movieData.Title}</Card.Title>
          </Card.Body>
        </Link>
        <Button
          onClick={() => {
            removeFav(`${movieData._id}`);
          }}>
          Remove from list
        </Button>
      </Card>
    </Col>
  );
}
