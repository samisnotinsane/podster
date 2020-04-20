import React from 'react';

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";


function HomePage() {
  return (
    <div>
      <h1>Podster</h1>
      <span>Choose to make sense of the world around you. Choose Podster.</span>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid>
          <Button
          fullWidth
          variant="contained"
          color="primary"
          >
            Sign in with Email
          </Button>
        </Grid>
        <Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign in with Google
          </Button>
        </Grid>
        <Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
          >
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
