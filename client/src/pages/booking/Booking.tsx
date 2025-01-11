import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import {
  Container,
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import { flightService, bookingService } from '../../services';
import { PassengerForm } from '../../components/booking/PassengerForm';
import { PaymentForm } from '../../components/booking/PaymentForm';
import { BookingSummary } from '../../components/booking/BookingSummary';
import type { Passenger } from '../../services/bookings';
import type { PaymentFormData } from '../../types/payment';

const steps = ['Passenger Details', 'Payment', 'Confirmation'];

export function BookingPage() {
  const { flightId } = useParams<{ flightId: string }>();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [_paymentDetails, setPaymentDetails] = useState<PaymentFormData | null>(null);

  const { data: flight, isLoading: isLoadingFlight } = useQuery(
    ['flight', flightId],
    () => flightService.getFlightDetails(flightId!),
    {
      enabled: !!flightId,
    }
  );

  const { mutate: createBooking } = useMutation(
    () =>
      bookingService.createBooking({
        flightId: flightId!,
        passengers,
      }),
    {
      onSuccess: (_booking) => {
        setActiveStep(2); // Move to confirmation step
      },
      onError: (_error) => {
        // Error is handled by global error handler
      },
    }
  );

  const handleNext = () => {
    if (activeStep === 1) {
      createBooking();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePassengersSubmit = (passengerData: Passenger[]) => {
    setPassengers(passengerData);
    setActiveStep(1);
  };

  const handlePaymentSubmit = (paymentData: PaymentFormData) => {
    setPaymentDetails(paymentData);
    handleNext();
  };

  if (isLoadingFlight) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!flight) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          Flight not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Book Your Flight
          </Typography>

          <Stepper activeStep={activeStep} sx={{ my: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4 }}>
            {activeStep === 0 && (
              <PassengerForm
                _flight={flight}
                onSubmit={handlePassengersSubmit}
                initialPassengers={passengers}
              />
            )}

            {activeStep === 1 && (
              <PaymentForm
                flight={flight}
                passengers={passengers}
                onSubmit={handlePaymentSubmit}
                onBack={handleBack}
              />
            )}

            {activeStep === 2 && (
              <BookingSummary
                flight={flight}
                passengers={passengers}
                onFinish={() => navigate('/bookings')}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 