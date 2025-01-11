import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, CircularProgress } from '@mui/material';
import { authService } from '../../services';

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: user, isLoading } = useQuery(
    'currentUser',
    () => authService.getCurrentUser(),
    {
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login page but save the attempted url
      navigate('/login', {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [user, isLoading, navigate, location]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? <>{children}</> : null;
} 