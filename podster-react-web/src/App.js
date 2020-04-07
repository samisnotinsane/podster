import React from 'react';
import {
  Route, 
  NavLink,
  HashRouter
} from 'react-router-dom';

import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Signin from './components/Signin';
import ForgotPassword from './components/ForgotPassword';

import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="nav-container">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/signin">Signin</NavLink>
        <NavLink to="/forgot-password">Forgot Password</NavLink>
      </div>
      <div className="content-container">
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </div>
    </HashRouter>
  );
}

export default App;
