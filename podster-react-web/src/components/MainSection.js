import React from 'react';

function MainSection() {
    return (
        <div className="main-section-container">
            <p>Choose to make sense of the world around you. Choose Podster</p>
            <div className="button-container">
                <button className="button-primary">Sign in with E-mail</button>
                <button className="button-primary">Sign in with Facebook</button>
                <button className="button-primary">Sign in with Google</button>
            </div>
        </div>
    );
}

export default MainSection;
