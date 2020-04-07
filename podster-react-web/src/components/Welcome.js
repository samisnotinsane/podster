import React from 'react';

function Welcome() {
    return (
        <div className="page">
            <div className="section header">
                <span>Podster</span>
            </div>
            <div className="section content">
                <p>Choose to make sense of the world around you. Choose Podster</p>
                <p>[Logo Here]</p>
            </div>
            <div className="section sign-in">
                <button className="button-primary">Sign in with E-mail</button>
                <button className="button-primary">Sign in with Facebook</button>
                <button className="button-primary">Sign in with Google</button>
            </div>
            <div className="section sign-up">
                <span>Don't have an account? Sign up now</span>
            </div>
        </div>
    );
}

export default Welcome;
