import { useState } from 'react';
import { useQuery } from 'react-query';
import { 
  Box,
  Paper,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FlightTakeoff, FlightLand, Person } from '@mui/icons-material';
import { routeService } from '../../services';
import type { Route } from '../../services/routes';

interface SearchFormProps {
  onSearch: (values: SearchFormValues) => void;
}

export interface SearchFormValues {
  origin: string;
  destination: string;
  departureDate: Date | null;
  returnDate: Date | null;
  passengers: number;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [values, setValues] = useState<SearchFormValues>({
    origin: '',
    destination: '',
    departureDate: null,
    returnDate: null,
    passengers: 1,
  });

  const [originQuery, setOriginQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');

  const { data: originSuggestions = [] } = useQuery(
    ['routeSuggestions', originQuery],
    () => routeService.getRouteSuggestions(originQuery),
    {
      enabled: originQuery.length > 1,
    }
  );

  const { data: destinationSuggestions = [] } = useQuery(
    ['routeSuggestions', destinationQuery],
    () => routeService.getRouteSuggestions(destinationQuery),
    {
      enabled: destinationQuery.length > 1,
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(values);
  };

  const isFormValid = () => {
    return (
      values.origin &&
      values.destination &&
      values.departureDate &&
      values.passengers > 0 &&
      values.passengers <= 9
    );
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      sx={{ p: 3, borderRadius: 2 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Search Flights
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            options={originSuggestions}
            getOptionLabel={(option: Route) => option.origin}
            onInputChange={(_, value) => setOriginQuery(value)}
            onChange={(_, value) => setValues({ ...values, origin: value?.origin || '' })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                required
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightTakeoff />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            options={destinationSuggestions}
            getOptionLabel={(option: Route) => option.destination}
            onInputChange={(_, value) => setDestinationQuery(value)}
            onChange={(_, value) => setValues({ ...values, destination: value?.destination || '' })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                required
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightLand />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DatePicker
            label="Departure Date"
            value={values.departureDate}
            onChange={(date) => setValues({ ...values, departureDate: date })}
            disablePast
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DatePicker
            label="Return Date (Optional)"
            value={values.returnDate}
            onChange={(date) => setValues({ ...values, returnDate: date })}
            disablePast
            minDate={values.departureDate || undefined}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Passengers"
            type="number"
            value={values.passengers}
            onChange={(e) => setValues({ ...values, passengers: parseInt(e.target.value) || 1 })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
              inputProps: { min: 1, max: 9 },
            }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isFormValid()}
            >
              Search Flights
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
} 