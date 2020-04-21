import React from 'react';
import { Link } from 'react-router-dom';

import SignUpLink from './SignUpLink';

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';

import PodsterLogo from '../../assets/Logo.svg';

import * as ROUTES  from '../../constants/routes';

const onClickEmail = (event) => {
  console.log('Email sign-in auth flow');
}

const onClickGoogle = (event) => {
  console.log('Google sign-in auth not yet implemented');
  alert('Sorry! This feature is not available yet :/');
}

const onClickFacebook = (event) => {
  console.log('Facebook sign-in auth not yet implemented');
  alert('Sorry! This feature is not available yet :/');
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    margin: theme.spacing(5, 0)
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(3, 0)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid className={classes.headerGroup}>
          <Typography variant="h3" align="center">
            Podster
          </Typography>
          <img 
            className={classes.logo}
            src={PodsterLogo}
            alt="Podster Logo" 
          />
          <Typography variant="body2" align="center">
            Choose to make sense of the world around you. Choose Podster.
          </Typography>
        </Grid>
        <Grid
          className={classes.buttonGroup}
          container 
          alignItems="center"
        >
          <Button
            to={ROUTES.SIGN_IN}
            component={Link}
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {onClickEmail()}}
          >
            <EmailIcon />
            Sign in with Email
          </Button>
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {onClickGoogle()}}
          >
            <LanguageIcon />
            Sign in with Google
          </Button>
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {onClickFacebook()}}
          >
            <FacebookIcon />
            Sign in with Facebook
          </Button>
        </Grid>
      </Container>
      <Grid item>
        <SignUpLink />
      </Grid>
    </div>
  );
}

export default HomePage;

export { SignUpLink };
