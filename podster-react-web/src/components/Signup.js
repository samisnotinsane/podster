import React from 'react';

function Signup() {
    return (
        <div className="signup-container">
            <span>Step: 1/2</span>
            <br />
            <form>
                <label htmlFor="fname">First name:</label>
                <input type="text" id="fname" />
                <br />
                <label htmlFor="surname">Surname:</label>
                <input type="text" id="surname" />
                <br />
                <input type="checkbox" name="male" value="Male" />Male
                <input type="checkbox" name="female" value="Female" />Female
                <button className="button-primary">Next</button>
            </form>
        </div>
    );
}

export default Signup;
