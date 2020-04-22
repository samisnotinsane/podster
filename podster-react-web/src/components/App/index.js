import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import AuthProvider from '../Firebase/auth';
import PrivateRoute from '../Firebase/PrivateRoute';
import HomePage from '../Home';
import LandingPage from '../Landing'
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';

import * as ROUTES  from '../../constants/routes';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> 
                    <PrivateRoute path={ROUTES.HOME} component={HomePage} />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;