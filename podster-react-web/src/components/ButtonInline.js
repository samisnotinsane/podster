import React from 'react';
import { NavLink } from 'react-router-dom';

const ButtonInline = ({ linkTo, children }) => {
    const button_style = {
        borderWidth: '0',
        background: 'transparent',
        color: '#54595D',
        textAlign: 'inherit',
        textDecoration: 'underline',
        WebkitFontSmoothing: 'inherit',
        padding: '0',
        fontSize: 'inherit',
        cursor: 'pointer',
    }
    
    return (
        <NavLink to={linkTo}>
            <button style={button_style}>
                {children}
            </button>
        </NavLink>
    );
}

export default ButtonInline;
