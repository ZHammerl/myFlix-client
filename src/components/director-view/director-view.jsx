import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';

export function DirectorView({ onBackClick, director }) {
  return (
    <Container>
      <h1> {director.Name}</h1>
      <p> born in {director.Birthyear} </p>
      <h5> Biography</h5>
      <p> {director.Bio}</p>
      <Button
        type="button"
        onClick={() => {
          onBackClick();
        }}>
        Back
      </Button>
    </Container>
  );
}
