import React from 'react';
import { NavLink } from 'react-router-dom';

const ButtonPrimary = ({ linkTo, children }) => {
    if (!linkTo) {
        linkTo = "#"; // no op
    }
    
    const button_style = {
        backgroundColor: '#24a0ed',
        border: 'none',
        borderRadius: '30px',
        color: 'white',
        padding: '15px 75px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        cursor: 'pointer',
    };

    return (
        <NavLink to={linkTo}>
            <button style={button_style}>
                {children}
            </button>
        </NavLink>
    );
}

export default ButtonPrimary;