import React from 'react';

function Signup() {
    return (
        <div className="signup-container">
            <form>
                <label htmlFor="fname">First name:</label>
                <input type="text" id="fname" />
                <br />
                <label htmlFor="surname">Surname:</label>
                <input type="text" id="surname" />
                <br />
                <input type="checkbox" name="male" value="Male" />Male
                <input type="checkbox" name="female" value="Female" />Female
                <br />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" />
                <br />
                <label html="email">Email:</label>
                <input type="text" id="email" />
                <br />
                <label html="password">Password:</label>
                <input type="password" id="password" />
                <br />
                <label htmlFor="repeatPassword">Repeat password:</label>
                <input type="password" id="password" />
                <br />
                <button className="button-primary">Let's go!</button>
            </form>
        </div>
    );
}

export default Signup;
