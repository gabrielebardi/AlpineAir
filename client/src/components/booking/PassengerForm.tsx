import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
} from '@mui/material';
import type { Flight } from '../../services/flights';
import type { Passenger } from '../../services/bookings';

interface PassengerFormProps {
  _flight: Flight;
  initialPassengers?: Passenger[];
  onSubmit: (passengers: Passenger[]) => void;
}

const MEAL_PREFERENCES = [
  { value: 'REGULAR', label: 'Regular Meal' },
  { value: 'VEGETARIAN', label: 'Vegetarian' },
  { value: 'VEGAN', label: 'Vegan' },
  { value: 'HALAL', label: 'Halal' },
  { value: 'KOSHER', label: 'Kosher' },
] as const;

const passengerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email must be less than 100 characters'),
  mealPreference: z.enum(['REGULAR', 'VEGETARIAN', 'VEGAN', 'HALAL', 'KOSHER'])
    .default('REGULAR'),
});

const formSchema = z.object({
  passengers: z.array(passengerSchema)
    .min(1, 'At least one passenger is required')
    .max(9, 'Maximum 9 passengers allowed'),
});

type FormValues = z.infer<typeof formSchema>;

export function PassengerForm({ _flight, initialPassengers = [], onSubmit }: PassengerFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: initialPassengers.length ? initialPassengers : [{
        name: '',
        email: '',
        mealPreference: 'REGULAR',
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'passengers',
  });

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data.passengers);
  });

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Typography variant="h6" gutterBottom>
        Passenger Information
      </Typography>

      {fields.map((field, index) => (
        <Box key={field.id} sx={{ mb: 4 }}>
          {index > 0 && <Divider sx={{ my: 3 }} />}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">
              Passenger {index + 1}
            </Typography>
            {fields.length > 1 && (
              <Button
                size="small"
                color="error"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                {...register(`passengers.${index}.name`)}
                error={!!errors.passengers?.[index]?.name}
                helperText={errors.passengers?.[index]?.name?.message}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register(`passengers.${index}.email`)}
                error={!!errors.passengers?.[index]?.email}
                helperText={errors.passengers?.[index]?.email?.message}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth
                error={!!errors.passengers?.[index]?.mealPreference}
              >
                <InputLabel>Meal Preference</InputLabel>
                <Select
                  label="Meal Preference"
                  defaultValue="REGULAR"
                  {...register(`passengers.${index}.mealPreference`)}
                >
                  {MEAL_PREFERENCES.map((pref) => (
                    <MenuItem key={pref.value} value={pref.value}>
                      {pref.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.passengers?.[index]?.mealPreference && (
                  <FormHelperText>
                    {errors.passengers[index]?.mealPreference?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box sx={{ mb: 3 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={() => append({ name: '', email: '', mealPreference: 'REGULAR' })}
          disabled={fields.length >= 9}
        >
          Add Another Passenger
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          Continue to Payment
        </Button>
      </Box>
    </Box>
  );
} 