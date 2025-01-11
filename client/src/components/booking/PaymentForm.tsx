import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Divider,
  Paper,
  FormHelperText,
} from '@mui/material';
import { Apple, CreditCard } from '@mui/icons-material';
import type { Flight } from '../../services/flights';
import type { Passenger } from '../../services/bookings';
import type { PaymentFormData } from '../../types/payment';

interface PaymentFormProps {
  flight: Flight;
  passengers: Passenger[];
  onSubmit: (paymentDetails: PaymentFormData) => void;
  onBack: () => void;
}

const cardSchema = z.object({
  number: z.string()
    .min(13, 'Card number must be at least 13 digits')
    .max(19, 'Card number must be at most 19 digits')
    .regex(/^\d+$/, 'Card number must contain only digits'),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be in MM/YY format')
    .refine((val) => {
      const [month, year] = val.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }, 'Card has expired'),
  cvc: z.string()
    .length(3, 'CVC must be 3 digits')
    .regex(/^\d+$/, 'CVC must contain only digits'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
});

const formSchema = z.object({
  paymentMethod: z.enum(['card', 'apple']),
  cardDetails: z.object({}).optional().refine(
    (_val) => true,
    { message: 'Card details are required for card payment' }
  ).transform((val) => val as z.infer<typeof cardSchema>),
});

export function PaymentForm({ flight, passengers, onSubmit, onBack }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'card',
      cardDetails: {
        number: '',
        expiry: '',
        cvc: '',
        name: '',
      },
    },
  });

  const paymentMethod = watch('paymentMethod');
  const totalAmount = flight.price * passengers.length;

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl 
            component="fieldset"
            error={!!errors.paymentMethod}
          >
            <FormLabel component="legend">Payment Method</FormLabel>
            <RadioGroup
              row
              defaultValue="card"
              {...register('paymentMethod')}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CreditCard />
                    Credit Card
                  </Box>
                }
              />
              <FormControlLabel
                value="apple"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Apple />
                    Apple Pay
                  </Box>
                }
              />
            </RadioGroup>
            {errors.paymentMethod && (
              <FormHelperText>{errors.paymentMethod.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {paymentMethod === 'card' && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                {...register('cardDetails.number')}
                error={!!errors.cardDetails?.number}
                helperText={errors.cardDetails?.number?.message}
                required
                inputProps={{
                  maxLength: 19,
                  inputMode: 'numeric',
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
                {...register('cardDetails.expiry')}
                error={!!errors.cardDetails?.expiry}
                helperText={errors.cardDetails?.expiry?.message}
                required
                inputProps={{
                  maxLength: 5,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="CVC"
                {...register('cardDetails.cvc')}
                error={!!errors.cardDetails?.cvc}
                helperText={errors.cardDetails?.cvc?.message}
                required
                inputProps={{
                  maxLength: 3,
                  inputMode: 'numeric',
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cardholder Name"
                {...register('cardDetails.name')}
                error={!!errors.cardDetails?.name}
                helperText={errors.cardDetails?.name?.message}
                required
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Flight Price (x{passengers.length})</Typography>
              <Typography>${flight.price} × {passengers.length}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Taxes & Fees</Typography>
              <Typography>${Math.round(totalAmount * 0.1)}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${Math.round(totalAmount * 1.1)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>Back</Button>
        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          disabled={isSubmitting}
        >
          {paymentMethod === 'apple' ? 'Pay with Apple Pay' : 'Complete Payment'}
        </Button>
      </Box>
    </Box>
  );
} 