import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import HomePage from '../Home';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';

import * as ROUTES  from '../../constants/routes';

function App() {
    return (
        <Router>
            <div>
                <Route exact path={ROUTES.LANDING} component={HomePage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />  
            </div>
        </Router>
    );
}

export default App;