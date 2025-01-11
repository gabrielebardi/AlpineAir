import { api, handleApiError } from './api';
import type { Flight } from './flights';

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  flight: Flight;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  passengers: Passenger[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Passenger {
  name: string;
  email: string;
  seatNumber?: string;
  mealPreference?: 'REGULAR' | 'VEGETARIAN' | 'VEGAN' | 'HALAL' | 'KOSHER';
}

export interface CreateBookingData {
  flightId: string;
  passengers: Omit<Passenger, 'seatNumber'>[];
}

export const bookingService = {
  async createBooking(bookingData: CreateBookingData): Promise<Booking> {
    try {
      const { data } = await api.post<{ booking: Booking }>('/bookings', bookingData);
      return data.booking;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getUserBookings(): Promise<Booking[]> {
    try {
      const { data } = await api.get<{ bookings: Booking[] }>('/bookings');
      return data.bookings;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getBookingDetails(bookingId: string): Promise<Booking> {
    try {
      const { data } = await api.get<{ booking: Booking }>(`/bookings/${bookingId}`);
      return data.booking;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async cancelBooking(bookingId: string): Promise<Booking> {
    try {
      const { data } = await api.post<{ booking: Booking }>(`/bookings/${bookingId}/cancel`);
      return data.booking;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async updateSeatAssignment(bookingId: string, passengerId: string, seatNumber: string): Promise<Booking> {
    try {
      const { data } = await api.put<{ booking: Booking }>(`/bookings/${bookingId}/seats`, {
        passengerId,
        seatNumber,
      });
      return data.booking;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async updateMealPreference(bookingId: string, passengerId: string, mealPreference: string): Promise<Booking> {
    try {
      const { data } = await api.put<{ booking: Booking }>(`/bookings/${bookingId}/meals`, {
        passengerId,
        mealPreference,
      });
      return data.booking;
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 