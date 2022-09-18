import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Row>
      <Form.Label>Search:</Form.Label>
      <Form.Control
        onChange={(e) => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="filter"
      />
    </Row>
  );
}

export default connect(null, { setFilter })(
  VisibilityFilterInput
);
