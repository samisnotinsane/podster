import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../podster_logo_A.svg';
            
const Logo = ({ size }) => {
    const logoSize = {
        height: size + '%',
        width: size + '%',
    };

    return (
        <img style={logoSize} src={logo} className="app-logo" alt="logo" />
    );
}

const ButtonPrimary = ({ linkTo, children }) => {
    const button_style = {
        backgroundColor: '#24a0ed',
        border: 'none',
        borderRadius: '30px',
        color: 'white',
        padding: '15px 75px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        cursor: 'pointer',
    };

    return (
        <NavLink to={linkTo}>
            <button style={button_style}>
                {children}
            </button>
        </NavLink>
    );
}

function Welcome() {
    return (
        <div className="page">
            <div>
                <span>Podster</span>
                <span>Choose to make sense of the world around you. Choose Podster</span>
            </div>
            <div>
                <Logo size="10" />
            </div>
            <div>
                <ButtonPrimary linkTo="/signin">
                    Sign in with E-mail
                </ButtonPrimary>
                <ButtonPrimary linkTo="/signin">
                    Sign in with Facebook
                </ButtonPrimary>
                <ButtonPrimary linkTo="/signin">
                    Sign in with Google
                </ButtonPrimary>
            </div>
            <div>
                <span>Don't have an account?
                    <NavLink to="/signup" className="accent-link">Sign up now</NavLink>
                </span>
            </div>
        </div>
    );
}

export default Welcome;
