import React from 'react';

function NewPassword() {
    return (
        <div className="new-password-container">
            <span>Reset your password</span>
                <br />
            <span>Enter your new password down below:</span>
            <form>
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword" />
                <br />
                <label htmlFor="confirmNewPassword">Confirm new password</label>
                <input type="password" id="confirmNewPassword" />
                <button className="button-primary">Change Password</button>
            </form>
            <span>Tip: Strong passwords use upper and lowercase characters, numbers and symbols.</span>
        </div>
    );
}

export default NewPassword;
