import React from 'react';

import ButtonPrimary from './ButtonPrimary.js';
import ButtonInline from './ButtonInline.js';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    render () {
        const {
            email,
            password 
        } = this.state;

        return (
            <div className="page">
                <div className="section header">
                    <span className="brand-name">Sign In</span>
                </div>
                <div className="section sign-in">
                    <form className="form">
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            type="text"
                            value={email}
                            onChange={this.onEmailChange}
                        />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={this.onPasswordChange}
                        />
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
                <hr />
                <h3>Debug:</h3>
                <p>Email entered: {email}</p>
                <p>Password entered: {password}</p>
            </div>
        );
    }
}

export default Signin;