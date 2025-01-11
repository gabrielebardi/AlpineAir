import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Container, Box, Typography } from '@mui/material';
import { SearchForm, type SearchFormValues } from '../components/flights/SearchForm';
import { SearchResults } from '../components/flights/SearchResults';
import { flightService } from '../services';
import type { Flight } from '../services/flights';

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchFormValues | null>(null);
  const [_selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const { data: flights = [], isLoading } = useQuery(
    ['flights', searchParams],
    () =>
      flightService.searchFlights({
        origin: searchParams?.origin,
        destination: searchParams?.destination,
        departureDate: searchParams?.departureDate?.toISOString(),
        returnDate: searchParams?.returnDate?.toISOString(),
        passengers: searchParams?.passengers,
      }),
    {
      enabled: !!searchParams,
    }
  );

  const handleSearch = (values: SearchFormValues) => {
    setSearchParams(values);
    setSelectedFlight(null);
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    navigate(`/booking/${flight.id}`);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Find Your Flight
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Search for flights between Washington D.C., New York, London, Geneva, and Zurich
        </Typography>

        <SearchForm onSearch={handleSearch} />

        {searchParams && (
          <SearchResults
            flights={flights}
            isLoading={isLoading}
            onSelect={handleSelectFlight}
          />
        )}
      </Box>
    </Container>
  );
} 