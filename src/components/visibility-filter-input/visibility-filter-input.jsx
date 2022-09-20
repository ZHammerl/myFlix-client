import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Row>
      <Col xs={2}>
        <Form.Label className="mt-1" htmlFor="search-bar">
          SEARCH:
        </Form.Label>
      </Col>
      <Col>
        <Form.Control
          id="search-bar"
          onChange={(e) => props.setFilter(e.target.value)}
          value={props.visibilityFilter}
          placeholder="Type to filter the database"
        />
      </Col>
    </Row>
  );
}

export default connect(null, { setFilter })(
  VisibilityFilterInput
);
