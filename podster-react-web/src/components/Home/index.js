import React from 'react';

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';

import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
        <Grid>
          <Typography variant="h3" align="center">
            Podster
          </Typography>
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
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
          >
            <EmailIcon />
            Sign in with Email
          </Button>
          <GoogleLogin
            className={classes.button}
            clientId="39828108942-74ho5nstb0o4fekv6sar7mnf202m3stv.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            buttonText="Sign in with Google"
            cookiePolicy={'single_host_origin'}
          />
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
          >
            <FacebookIcon />
            Sign in with Facebook
          </Button>
        </Grid>
      </Container>
      
      <Grid item>
        <Link href="#" variant="body2">
          Already have an account? Sign in
        </Link>
      </Grid>
    </div>
  );
}

export default HomePage;
