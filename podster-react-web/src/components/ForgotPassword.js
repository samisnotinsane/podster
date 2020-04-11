import React from 'react';
import { NavLink } from 'react-router-dom';

import ButtonPrimary from './ButtonPrimary.js';
import ButtonInline from './ButtonInline.js';

function ForgotPassword() {
    return (
        <div className="page">
            <div className="section header">
                <span className="brand-tagline">Forgot your password?</span>
            </div>
            <div className="section header">
                <span>
                    Let's fix that. Please enter the email you
                    used when you first signed into Podster and we'll 
                    send you a link to reset your password.
                </span>
            </div>
            <div className="section sign-in">
                <form className="form">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" />
                    <br />
                    <ButtonPrimary linkTo="/new-password">Next</ButtonPrimary>
                </form>
                <span>Back to <ButtonInline linkTo="/signin">Sign in</ButtonInline></span>
                
            </div>
        </div>
    );
}

export default ForgotPassword;