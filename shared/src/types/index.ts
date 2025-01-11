import { z } from 'zod'

// Enums
export enum FlightStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

// Schemas
export const routeSchema = z.object({
  id: z.string(),
  origin: z.string().length(3),
  destination: z.string().length(3),
  basePrice: z.number().positive(),
  minPassengers: z.number().int().min(1),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const flightSchema = z.object({
  id: z.string(),
  routeId: z.string(),
  departureTime: z.date(),
  aircraft: z.string(),
  capacity: z.number().int().positive(),
  price: z.number().positive(),
  status: z.nativeEnum(FlightStatus),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const bookingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  flightId: z.string(),
  status: z.nativeEnum(BookingStatus),
  passengers: z.number().int().positive(),
  totalPrice: z.number().positive(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const preferenceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  routeId: z.string(),
  timeSlot: z.date(),
  timeWindow: z.number().int().positive(),
  passengers: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date()
})

// Types
export type Route = z.infer<typeof routeSchema>
export type Flight = z.infer<typeof flightSchema>
export type Booking = z.infer<typeof bookingSchema>
export type Preference = z.infer<typeof preferenceSchema>

// API Request Types
export const searchFlightsSchema = z.object({
  origin: z.string().length(3),
  destination: z.string().length(3),
  startDate: z.date(),
  endDate: z.date(),
  passengers: z.number().int().positive()
})

export const createBookingSchema = z.object({
  flightId: z.string(),
  passengers: z.number().int().positive()
})

export const createPreferenceSchema = z.object({
  routeId: z.string(),
  timeSlot: z.date(),
  timeWindow: z.number().int().positive(),
  passengers: z.number().int().positive()
})

export type SearchFlightsRequest = z.infer<typeof searchFlightsSchema>
export type CreateBookingRequest = z.infer<typeof createBookingSchema>
export type CreatePreferenceRequest = z.infer<typeof createPreferenceSchema> 