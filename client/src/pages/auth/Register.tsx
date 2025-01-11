import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: register, isLoading, error } = useMutation<
    User,
    Error,
    { name: string; email: string; password: string }
  >(
    (userData) => authService.register(userData),
    {
      onSuccess: () => {
        navigate('/', { replace: true });
      },
    }
  );

  const { mutate: loginWithApple, isLoading: isAppleLoading } = useMutation(
    () => authService.loginWithApple(),
    {
      onSuccess: () => {
        navigate('/', { replace: true });
      },
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" paragraph>
            Join AlpineAir to start booking your flights
          </Typography>

          {error instanceof Error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              helperText="Password must be at least 8 characters long"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
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
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" color="primary">
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 