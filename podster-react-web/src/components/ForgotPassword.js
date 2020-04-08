import React from 'react';
import { NavLink } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div className="forgot-password-container">
            <span>Forgot your password?</span>
            <br />
            <span>
                Let's fix that. Please enter the email you
                used when you first signed into Podster and we'll 
                send you a link to reset your password.
            </span>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" />
                <button className="button-primary">Next</button>
            </form>
            <p>Back to <NavLink to="/signin" className="accent-link">Sign in</NavLink></p>
            <NavLink to="/new-password">New password</NavLink>
        </div>
    );
}

export default ForgotPassword;