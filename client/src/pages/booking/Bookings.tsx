import { useQuery } from 'react-query';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  FlightTakeoff,
  FlightLand,
  EventSeat,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { bookingService } from '../../services';

export function BookingsPage() {
  const { data: bookings, isLoading, error } = useQuery(
    'userBookings',
    () => bookingService.getUserBookings()
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          Failed to load bookings. Please try again later.
        </Alert>
      </Container>
    );
  }

  if (!bookings?.length) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            No Bookings Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You haven&apos;t made any bookings yet.
          </Typography>
          <Button variant="contained" href="/search">
            Search Flights
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Bookings
        </Typography>

        {bookings.map((booking) => (
          <Paper
            key={booking.id}
            variant="outlined"
            sx={{ p: 3, mb: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlightTakeoff color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Departure
                    </Typography>
                    <Typography variant="subtitle1">
                      {format(new Date(booking.flight.departureTime), 'HH:mm, EEE, MMM d')}
                    </Typography>
                    <Typography variant="body2">
                      {booking.flight.route.origin}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlightLand color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Arrival
                    </Typography>
                    <Typography variant="subtitle1">
                      {format(new Date(booking.flight.arrivalTime), 'HH:mm, EEE, MMM d')}
                    </Typography>
                    <Typography variant="body2">
                      {booking.flight.route.destination}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip
                    label={booking.status}
                    color={
                      booking.status === 'CONFIRMED'
                        ? 'success'
                        : booking.status === 'PENDING'
                        ? 'warning'
                        : 'error'
                    }
                  />
                  <Typography variant="body2" color="text.secondary">
                    Booking Reference
                  </Typography>
                  <Typography variant="subtitle2">
                    {booking.id.toUpperCase()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Passengers
              </Typography>
              <Grid container spacing={2}>
                {booking.passengers.map((passenger, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <EventSeat color="action" />
                      <Box>
                        <Typography variant="body2">
                          {passenger.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Seat: {passenger.seatNumber || 'Not assigned'} •{' '}
                          {passenger.mealPreference} Meal
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                size="small"
                disabled={booking.status === 'CANCELLED'}
                onClick={() => {
                  // TODO: Handle manage booking
                }}
              >
                Manage Booking
              </Button>
              {booking.status === 'CONFIRMED' && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => {
                    // TODO: Handle cancellation
                  }}
                >
                  Cancel Booking
                </Button>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
} 