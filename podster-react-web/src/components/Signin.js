import React from 'react';
import { NavLink } from 'react-router-dom';

function Signin() {
    return (
        <div className="page">
            <div className="section header">
                <span>Sign In</span>
            </div>
            <div className="section sign-in">
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                    <br />
                    <input type="checkbox" name="isRemainSignedIn" value="true" /> Keep me logged in
                    <button className="button-primary">Let's go!</button>
                </form>
            </div>
            
            <NavLink to="/forgot-password" className="accent-link">Forgot your password?</NavLink>
        </div>
    );
}

export default Signin;