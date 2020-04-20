import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
} from 'react-router-dom';

import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Signin from './components/Signin';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';

import './App.css';

function App() {
  return (
    <Router>
      <div>
      <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/new-password" component={NewPassword} />
      </div>
    </Router>
  );
}

export default App;
