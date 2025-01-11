import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import { Flight } from '@mui/icons-material';

export function Navbar() {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Flight color="primary" />
              <Typography variant="h6" color="primary" noWrap>
                AlpineAir
              </Typography>
            </Box>
          </RouterLink>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/search"
              color="inherit"
            >
              Search Flights
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/login"
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 