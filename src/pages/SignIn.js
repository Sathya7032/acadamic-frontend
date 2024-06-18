import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../context/AuthContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        <h3><span style={{ color: 'black' }}>Academic</span><span style={{ color: 'tomato' }}>Folio</span></h3>
      </Link>{' '}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {


  const { loginUser } = React.useContext(AuthContext);
  const handleSubmits = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    email.length > 0 && loginUser(email, password);

    console.log(email);
    console.log(password);
  };

  const handleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('http://acadamicfolios.pythonanywhere.com/dj-rest-auth/google/', {
        access_token: response.credential,  // The token from Google
      });
      // Store the token or user info as needed
      console.log('Logged in:', res.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const reachGoogle = () => {
    const clientID = "290336876059-u0nmtqck47t6bluo76b2jn18i9e2bdgb.apps.googleusercontent.com";
    const callBackURI = "https://acadamicfolio.info/dashboard";
    window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`)
}



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <GoogleOAuthProvider clientId="290336876059-u0nmtqck47t6bluo76b2jn18i9e2bdgb.apps.googleusercontent.com">
            <div>
              <h2>Login with Google</h2>
              <GoogleLogin
                onSuccess={reachGoogle}
                onError={() => console.log('Login Failed')}
              />
            </div>
          </GoogleOAuthProvider>
          <Box component="form" onSubmit={handleSubmits} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="https://acadamicfolios.pythonanywhere.com/password-reset/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}