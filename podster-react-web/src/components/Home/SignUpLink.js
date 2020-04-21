import React from 'react';

import Link from "@material-ui/core/Link";

import * as ROUTES  from '../../constants/routes';

const handleClick = () => {
    alert(
        `Podster is under development. We cannot accept new sign ups at this moment.`
    );
}

const SignUpLink = () => {
    return (
        <Link 
            // href={ROUTES.SIGN_UP} 
            variant="body2" 
            color="secondary"
            underline="hover"
            onClick={() => {handleClick()}}
        >
            Don't have an account? Sign up now
        </Link>
    );
}

export default SignUpLink;
