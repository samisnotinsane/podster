import React from 'react';
import { NavLink } from 'react-router-dom';

function Signin() {
    return (
        <div className="page">
            <div className="section header">
                <span className="brand-name">Sign In</span>
            </div>
            <div className="section sign-in">
                <form className="form">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                    <br />
                    <div className="form-row">
                        Keep me logged in
                        <input type="checkbox" name="isRemainSignedIn" value="true" />
                    </div>
                    <div className="form-row">
                        <button className="button-primary">Let's go!</button>
                    </div>
                </form>
            </div>
            
            <NavLink to="/forgot-password" className="accent-link">Forgot your password?</NavLink>
        </div>
    );
}

export default Signin;