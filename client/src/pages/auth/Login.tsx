import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useMutation } from 'react-query';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  Link,
} from '@mui/material';
import { Apple } from '@mui/icons-material';
import { authService } from '../../services';
import type { User } from '../../types/user';

interface LocationState {
  from?: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as LocationState)?.from || '/';

  const { mutate: login, isLoading, error } = useMutation<
    User,
    Error,
    { email: string; password: string }
  >(
    (credentials) => authService.login(credentials),
    {
      onSuccess: () => {
        navigate(from, { replace: true });
      },
    }
  );

  const { mutate: loginWithApple, isLoading: isAppleLoading } = useMutation(
    () => authService.loginWithApple(),
    {
      onSuccess: () => {
        navigate(from, { replace: true });
      },
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" paragraph>
            Sign in to manage your bookings and access exclusive features
          </Typography>

          {error instanceof Error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<Apple />}
            onClick={() => loginWithApple()}
            disabled={isAppleLoading}
          >
            Continue with Apple
          </Button>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" align="center" paragraph>
              Don&apos;t have an account? <Link component={RouterLink} to="/register">Sign up</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 