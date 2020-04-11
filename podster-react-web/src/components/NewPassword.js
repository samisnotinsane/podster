import React from 'react';

import ButtonPrimary from './ButtonPrimary.js';

function NewPassword() {
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
                    <input type="password" id="newPassword" />
                    <label htmlFor="confirmNewPassword">Confirm new password</label>
                    <input type="password" id="confirmNewPassword" />
                    
                    <div className="form-row">
                        <ButtonPrimary>Change Password</ButtonPrimary>
                    </div>
                </form>
                <span>Tip: Strong passwords use upper and lowercase characters, numbers and symbols.</span>
            </div>
        </div>
    );
}

export default NewPassword;
