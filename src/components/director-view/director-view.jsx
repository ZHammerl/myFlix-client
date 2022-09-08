import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export function DirectorView({ onBackClick, director, directorMovies }) {
  return (
    <Container className="mt-5">
      <h1> {director.Name}</h1>
      <p> born in {director.Birthyear} </p>
      <h5> Biography</h5>
      <p> {director.Bio}</p>
      <Button
        className="mb-3"
        type="button"
        onClick={() => {
          onBackClick();
        }}>
        Back
      </Button>
      <br />
      <h5>Some movies from this director:</h5>
      <Row className="justify-content mt-3 director-cardView">
        {directorMovies.map((movie) => (
          <MovieCard key={movie._id} movieData={movie}></MovieCard>
        ))}
      </Row>
    </Container>
  );
}
