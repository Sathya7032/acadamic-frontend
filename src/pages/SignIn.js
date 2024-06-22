import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";
const defaultTheme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = React.useState(false);

  const handleSubmits = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      setLoading(true);
      try {
        // Handle your email/password login logic here
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoginSuccess = async (response) => {
    const { code } = response;
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ code });
      const res = await axios.post('http://localhost:8000/dj-rest-auth/google/', body, config);
      // Assuming res.data contains your authentication token or user data
      // Dispatch your login success action here
    } catch (err) {
      console.error('Login Failed:', err);
      // Handle login failure here
    } finally {
      setLoading(false);
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
            {/* Your email/password form */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
