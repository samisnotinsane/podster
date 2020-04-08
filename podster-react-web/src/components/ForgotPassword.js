import React from 'react';
import { NavLink } from 'react-router-dom';

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
                    <button className="button-primary">Next</button>
                </form>
                <p>Back to <NavLink to="/signin" className="accent-link">Sign in</NavLink></p>
            </div>
            
            <NavLink to="/new-password">New password</NavLink>
        </div>
    );
}

export default ForgotPassword;