import React from 'react';

import ButtonPrimary from './ButtonPrimary.js';
import ButtonInline from './ButtonInline.js';

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
                        {' '}
                        <input type="checkbox" name="isRemainSignedIn" value="true" />
                    </div>
                    <div className="form-row">
                        <ButtonPrimary linkTo="/home">Let's go!</ButtonPrimary>
                    </div>
                </form>
            </div>
            <ButtonInline linkTo="/forgot-password">Forgot your password?</ButtonInline>
        </div>
    );
}

export default Signin;