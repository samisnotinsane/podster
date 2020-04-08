import React from 'react';

function NewPassword() {
    return (
        <div className="page">
            <div className="section header">
                <span className="brand-name">Reset your password</span>
                <span className="brand-tagline">Enter your new password down below:</span>
            </div>
            <div className="section sign-in">
                <form className="form">
                    <label htmlFor="newPassword">Password</label>
                    <input type="password" id="newPassword" />
                    <label htmlFor="confirmNewPassword">Confirm new password</label>
                    <input type="password" id="confirmNewPassword" />
                    
                    <div className="form-row">
                        <button className="button-primary">Change Password</button>
                    </div>
                </form>
                <span>Tip: Strong passwords use upper and lowercase characters, numbers and symbols.</span>
            </div>
        </div>
    );
}

export default NewPassword;
