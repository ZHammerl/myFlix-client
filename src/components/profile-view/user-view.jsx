import React from 'react';
import { Row, Form, Col } from 'react-bootstrap';

export function UserView({ user }) {
  return (
    <h4>
      Profile of <strong>{user}</strong>
    </h4>
  );
}
