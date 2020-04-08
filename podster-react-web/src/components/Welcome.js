import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../podster_logo_A.svg';

function Welcome() {
    return (
        <div className="page">
            <div className="section header">
                <span className="brand-name">Podster</span>
                <span className="brand-tagline">Choose to make sense of the world around you. Choose Podster</span>
            </div>
            <div className="section content">
                <img src={logo} className="app-logo" alt="logo" />
            </div>
            <div className="section sign-in">
                <NavLink to="/signin" className="button-primary">Sign in with E-mail</NavLink>
                <NavLink to="/signin" className="button-primary">Sign in with Facebook</NavLink>
                <NavLink to="/signin" className="button-primary">Sign in with Google</NavLink>
            </div>
            <div className="section sign-up">
                <span>Don't have an account?
                    <NavLink to="/signup" className="accent-link">Sign up now</NavLink>
                </span>
            </div>
        </div>
    );
}

export default Welcome;
