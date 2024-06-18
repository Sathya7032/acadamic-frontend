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
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        <h3><span style={{ color: 'black' }}>Academic</span><span style={{ color: 'tomato' }}>Folio</span></h3>
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const { loginUser } = React.useContext(AuthContext);

  const handleSubmits = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      loginUser(email, password);
    }
  };

  const handleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('http://acadamicfolios.pythonanywhere.com/accounts/google/login/token/', {
        token: response.credential,  // The token from Google
      });

      if (res.data.key) {
        // Store the token and manage the session
        localStorage.setItem('token', res.data.key);
        // Redirect or update UI based on login
        window.location.href = '/dashboard';  // Update as necessary
      } else {
        console.error('Login failed:', res.data);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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
                onSuccess={handleLoginSuccess}
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
