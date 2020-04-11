import React from 'react';
import {
  Route, 
  HashRouter
} from 'react-router-dom';

import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Signin from './components/Signin';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';

import './App.css';

function App() {
  return (
    <HashRouter>
      <div>
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/new-password" component={NewPassword} />
      </div>
    </HashRouter>
  );
}

export default App;
