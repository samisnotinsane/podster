import React from 'react';

import ButtonPrimary from './ButtonPrimary.js';
import ButtonInline from './ButtonInline.js';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        this.onEmailChange = this.onEmailChange.bind(this);
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    render () {
        const {
            email
        } = this.state;
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
                        <input 
                            id="email" 
                            type="text"
                            value={email}
                            onChange={this.onEmailChange}
                        />
                        <br />
                        <ButtonPrimary linkTo="/new-password">Next</ButtonPrimary>
                    </form>
                    <span>Back to <ButtonInline linkTo="/signin">Sign in</ButtonInline></span>
                </div>
                <hr />
                <h3>Debug</h3>
                <p>Email entered: {email}</p>
            </div>
        );
    }
}

export default ForgotPassword;