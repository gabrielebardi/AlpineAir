import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Button,
  Divider,
  Skeleton,
} from '@mui/material';
import {
  FlightTakeoff,
  FlightLand,
  AccessTime,
  EventSeat,
  ArrowRightAlt,
} from '@mui/icons-material';
import { format } from 'date-fns';
import type { Flight } from '../../services/flights';

interface SearchResultsProps {
  flights: Flight[];
  isLoading?: boolean;
  onSelect: (flight: Flight) => void;
}

export function SearchResults({ flights, isLoading = false, onSelect }: SearchResultsProps) {
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);

  const handleSelect = (flight: Flight) => {
    setSelectedFlightId(flight.id);
    onSelect(flight);
  };

  if (isLoading) {
    return (
      <Box sx={{ mt: 3 }}>
        {[...Array(3)].map((_, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton variant="rectangular" height={100} />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (!flights.length) {
    return (
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No flights found for your search criteria
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your search parameters
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {flights.map((flight) => (
        <Card
          key={flight.id}
          sx={{
            mb: 2,
            borderColor: selectedFlightId === flight.id ? 'primary.main' : 'divider',
            borderWidth: selectedFlightId === flight.id ? 2 : 1,
            borderStyle: 'solid',
          }}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlightTakeoff color="primary" />
                  <Typography variant="h6">
                    {format(new Date(flight.departureTime), 'HH:mm')}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {flight.route.origin}
                </Typography>
              </Grid>

              <Grid item xs={12} md={3} sx={{ textAlign: { md: 'center' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {Math.floor(flight.route.flightDuration / 60)}h{' '}
                    {flight.route.flightDuration % 60}m
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }}>
                  <ArrowRightAlt color="action" />
                </Divider>
                <Typography variant="body2" color="text.secondary">
                  Direct Flight
                </Typography>
              </Grid>

              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlightLand color="primary" />
                  <Typography variant="h6">
                    {format(new Date(flight.arrivalTime), 'HH:mm')}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {flight.route.destination}
                </Typography>
              </Grid>

              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    ${flight.price}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                    <Chip
                      icon={<EventSeat />}
                      label={`${flight.availableSeats} seats left`}
                      size="small"
                      color={flight.availableSeats < 5 ? 'error' : 'default'}
                    />
                    <Chip
                      label={flight.status}
                      size="small"
                      color={
                        flight.status === 'SCHEDULED'
                          ? 'success'
                          : flight.status === 'DELAYED'
                          ? 'warning'
                          : 'error'
                      }
                    />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleSelect(flight)}
                    disabled={flight.status === 'CANCELLED'}
                  >
                    Select Flight
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
} 