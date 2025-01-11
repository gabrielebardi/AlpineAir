import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  CheckCircle,
  FlightTakeoff,
  FlightLand,
  AccessTime,
  EventSeat,
} from '@mui/icons-material';
import { format } from 'date-fns';
import type { Flight } from '../../services/flights';
import type { Passenger } from '../../services/bookings';

interface BookingSummaryProps {
  flight: Flight;
  passengers: Passenger[];
  onFinish: () => void;
}

export function BookingSummary({ flight, passengers, onFinish }: BookingSummaryProps) {
  const totalAmount = Math.round(flight.price * passengers.length * 1.1); // Including taxes

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckCircle color="success" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your flight has been booked successfully. A confirmation email has been sent to all passengers.
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Flight Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlightTakeoff color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Departure
                </Typography>
                <Typography variant="subtitle1">
                  {format(new Date(flight.departureTime), 'HH:mm, EEE, MMM d')}
                </Typography>
                <Typography variant="body2">{flight.route.origin}</Typography>
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
                  {format(new Date(flight.arrivalTime), 'HH:mm, EEE, MMM d')}
                </Typography>
                <Typography variant="body2">{flight.route.destination}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime color="action" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Duration
                </Typography>
                <Typography variant="subtitle1">
                  {Math.floor(flight.route.flightDuration / 60)}h{' '}
                  {flight.route.flightDuration % 60}m
                </Typography>
                <Typography variant="body2">Direct Flight</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Passenger Information
        </Typography>
        {passengers.map((passenger, index) => (
          <Box key={index}>
            {index > 0 && <Divider sx={{ my: 2 }} />}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">{passenger.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {passenger.email}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    size="small"
                    icon={<EventSeat />}
                    label={passenger.seatNumber || 'Seat TBA'}
                  />
                  <Chip
                    size="small"
                    label={`${passenger.mealPreference} Meal`}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Payment Summary
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Flight Price (x{passengers.length})</Typography>
          <Typography>${flight.price} × {passengers.length}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Taxes & Fees</Typography>
          <Typography>${Math.round(flight.price * passengers.length * 0.1)}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Total Paid</Typography>
          <Typography variant="h6">${totalAmount}</Typography>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={onFinish}
        >
          View My Bookings
        </Button>
      </Box>
    </Box>
  );
} 