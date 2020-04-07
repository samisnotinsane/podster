import React from 'react';

function Signin() {
    return (
        <div className="signin-container">
            <span>Sign In</span>
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
    );
}

export default Signin;