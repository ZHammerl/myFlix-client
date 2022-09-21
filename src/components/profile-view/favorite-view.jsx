import React from 'react';
import {
  Col,
  Container,
  Row,
  Card,
  CardGroup,
  Button,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function FavoriteView({ movieData, handleFav }) {
  return (
    <Col
      xs={12}
      sm={{ span: 9, offset: 2 }}
      md={{ span: 5, offset: 0 }}
      lg={4}
      xl={3}
      className="mb-3 d-flex">
      {' '}
      <CardGroup>
        <Card border="light" className="mb-3">
          <Link to={`/movies/${movieData._id}`}>
            <Card.Img
              className="poster position-relative"
              variant="top"
              src={movieData.Imageurl}
            />
            <Card.Body>
              <Card.Title className="cardText">
                {' '}
                {movieData.Title}
              </Card.Title>
            </Card.Body>
          </Link>
          <Button
            className="btn-primary"
            variant="bottom"
            onClick={() => {
              handleFav(movieData._id, 'remove');
            }}>
            REMOVE
          </Button>
        </Card>
      </CardGroup>
    </Col>
  );
}
