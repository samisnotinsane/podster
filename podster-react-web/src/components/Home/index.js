import React from 'react';

import firebase from '../Firebase';

import { Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";

const HomePage = () => {
  return (
    <div>
      <Typography variant="h3" align="left">
        Home
      </Typography>
      <Button
            variant="outlined"
            color="secondary"
            onClick={() => {firebase.auth().signOut()}}
        >
          Sign out
        </Button>
    </div>
  );
}

export default HomePage;
