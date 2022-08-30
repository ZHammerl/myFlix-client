import React, { useState } from 'react';
import PropTypes from 'prop-types';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /*Send a request to the server for authentication*/
    /* then call this.props.onLoggedIn(username)*/
    props.onLoggedIn(username);
  };

  return (
    <div>
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
    <button type="button">Register</button>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}