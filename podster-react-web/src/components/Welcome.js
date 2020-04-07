import React from 'react';

function MainSection() {
    return (
        <div className="welcome-container">
            <div className="header-container">
                <h1>Podster</h1>
                <p>[Logo Here]</p>
            </div>
            <div className="main-section-container">
                <p>Choose to make sense of the world around you. Choose Podster</p>
                <div className="button-container">
                    <button className="button-primary">Sign in with E-mail</button>
                    <button className="button-primary">Sign in with Facebook</button>
                    <button className="button-primary">Sign in with Google</button>
                </div>
            </div>
            <div className="footer-container">
                <p>Don't have an account? Sign up now</p>
            </div>
        </div>
    );
}

export default MainSection;
