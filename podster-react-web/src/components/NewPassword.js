import React from 'react';

import ButtonPrimary from './ButtonPrimary.js';

class NewPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
        };
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    onConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value,
        });
    }

    render () {
        const {
            password,
            confirmPassword
        } = this.state;

        return (
            <div className="page">
                <div className="section header">
                    <span className="brand-name">Reset your password</span>
                    <br />
                    <span className="brand-tagline">Enter your new password down below:</span>
                </div>
                <div className="section sign-in">
                    <form className="form">
                        <label htmlFor="newPassword">Password</label>
                        <input 
                            id="newPassword" 
                            type="password"
                            value={password}
                            onChange={this.onPasswordChange}
                        />
                        <label htmlFor="confirmNewPassword">Confirm new password</label>
                        <input 
                            id="confirmNewPassword" 
                            type="password"
                            value={confirmPassword}
                            onChange={this.onConfirmPasswordChange}
                        />
                        
                        <div className="form-row">
                            <ButtonPrimary>Change Password</ButtonPrimary>
                        </div>
                    </form>
                    <span>Tip: Strong passwords use upper and lowercase characters, numbers and symbols.</span>
                </div>
                <hr />
                <h3>Debug</h3>
                <p>Password entered: {password}</p>
                <p>Confirm password entered: {confirmPassword}</p>
            </div>
        );
    }
}

export default NewPassword;
