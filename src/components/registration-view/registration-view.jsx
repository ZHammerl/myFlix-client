import React, { useState } from 'react';
import PropTypes from 'prop-types';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birth_date, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, birth_date, email);
    /*Send a request to the server for authentication*/
    /* then call props on registered user*/
    props.onRegistration(username);
  };
  const [isShown, setIsShown] = useState(false);
const handleClick = event => { 
    setIsShown = true
}
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
        <label>
          E-Mail:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Birth Date:
          <input type="date" value={birth_date} onChange={(e) => setBirthdate(e.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>
          Register
        </button>
      </form>
      <button type="button" onClick=''>
        Log In
      </button>
    </div>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
