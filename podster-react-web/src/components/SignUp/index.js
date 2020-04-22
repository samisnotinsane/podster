import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import firebase from '../Firebase';

import * as ROUTES from '../../constants/routes';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    const {
      email,
      password
    } = event.target.elements;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push(ROUTES.HOME);
    } catch (error) {
      alert('Error! Sign up failed.');
      console.log(error);
    }

    event.preventDefault();
  }, [ history ]);

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default withRouter(SignUp);
