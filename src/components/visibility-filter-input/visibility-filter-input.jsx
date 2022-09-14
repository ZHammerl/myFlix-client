import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <div className="mb-3">
      <Form.Label>Search Titles:</Form.Label>

      <Form.Control
        onChange={(e) => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="filter"
      />
    </div>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
