import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            p: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 600,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography color="text.secondary" paragraph>
              We apologize for the inconvenience. Please try refreshing the page or return to the homepage.
            </Typography>
            {this.state.error && (
              <Typography
                variant="body2"
                color="error"
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'error.light',
                  color: 'error.contrastText',
                  borderRadius: 1,
                }}
              >
                Error: {this.state.error.message}
              </Typography>
            )}
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                onClick={this.handleReset}
                sx={{ mr: 2 }}
              >
                Return to Homepage
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
} 