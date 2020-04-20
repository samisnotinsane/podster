import React from 'react';

import logo from '../podster_logo_A.svg';
import ButtonPrimary from './ButtonPrimary.js';
import ButtonInline from './ButtonInline.js';
            
const Logo = ({ size }) => {
    const logoSize = {
        height: size + '%',
        width: size + '%',
    };

    return (
        <img style={logoSize} src={logo} className="app-logo" alt="logo" />
    );
}

function Welcome() {
    return (
        <div className="page">
            <div>
                <span>Podster</span>
                <br />
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
                <span>
                    Don't have an account? 
                    {' '} 
                    <ButtonInline linkTo="/signup">Sign up</ButtonInline>
                </span>
            </div>
        </div>
    );
}

export default Welcome;
