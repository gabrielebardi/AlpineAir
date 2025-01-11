import { z } from 'zod';

export const searchFlightsSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  passengers: z.number().min(1).max(9),
});

export const bookingSchema = z.object({
  flightId: z.string(),
  passengers: z.array(z.object({
    name: z.string(),
    email: z.string().email(),
    seatPreference: z.enum(['window', 'aisle', 'middle']).optional(),
    mealPreference: z.enum(['regular', 'vegetarian', 'vegan', 'kosher', 'halal']).optional(),
  })),
});

export const preferencesSchema = z.object({
  routeId: z.string(),
  timeSlot: z.string(),
  timeWindow: z.number().min(1).max(24),
  passengers: z.number().min(1).max(9),
}); 