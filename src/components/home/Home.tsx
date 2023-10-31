import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../materialUI-common';
import { useStyles } from './HomeStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import { NavBar } from '../navBar/NavBar';
import ProfileForm from '../profile/Profile';
import Contacts from '../contacts/Contacts';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        SLC Budget
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavBar />
        <Box
          component="main"
          sx={useStyles.boxMain}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4, }}>
            <Grid item >

              {/* Profile */}
              <Grid item xs={12} md={8} lg={9} >
                <Paper
                  sx={useStyles.paper}
                >
                  <ProfileForm />
                </Paper>
              </Grid>

              {/* Chart 
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}

              {/* Recent Deposits 
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>*/}

              {/* Recent Orders 
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid> */}
            </Grid>
            <Copyright sx={{ pt: 4, color: "white" }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
