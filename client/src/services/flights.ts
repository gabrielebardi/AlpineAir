import { api } from './api';
import { MVP_ROUTES, Route } from './routes';

export interface Flight {
  id: string;
  routeId: string;
  route: Route;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  status: 'SCHEDULED' | 'DELAYED' | 'CANCELLED' | 'COMPLETED';
}

export interface SearchFlightsParams {
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
}

export interface FlightAvailability {
  date: string;
  price: number;
  availableSeats: number;
}

// Helper function to generate mock flights for MVP
const generateMockFlights = (params: SearchFlightsParams): Flight[] => {
  const matchingRoutes = MVP_ROUTES.filter(route => {
    if (params.origin && !route.origin.toLowerCase().includes(params.origin.toLowerCase())) return false;
    if (params.destination && !route.destination.toLowerCase().includes(params.destination.toLowerCase())) return false;
    return true;
  });

  if (!matchingRoutes.length) return [];

  // Generate flights for the next 30 days
  const flights: Flight[] = [];
  const today = new Date();
  const departureDate = params.departureDate ? new Date(params.departureDate) : today;

  matchingRoutes.forEach(route => {
    // Generate 2 flights per day for each route
    const morningFlight: Flight = {
      id: `${route.id}-${departureDate.toISOString().split('T')[0]}-am`,
      routeId: route.id,
      route,
      departureTime: `${departureDate.toISOString().split('T')[0]}T08:00:00Z`,
      arrivalTime: new Date(departureDate.getTime() + route.flightDuration * 60000).toISOString(),
      price: route.basePrice + Math.floor(Math.random() * 200), // Add some price variation
      availableSeats: Math.floor(Math.random() * 50) + 10,
      status: 'SCHEDULED',
    };

    const eveningFlight: Flight = {
      id: `${route.id}-${departureDate.toISOString().split('T')[0]}-pm`,
      routeId: route.id,
      route,
      departureTime: `${departureDate.toISOString().split('T')[0]}T18:00:00Z`,
      arrivalTime: new Date(departureDate.getTime() + route.flightDuration * 60000).toISOString(),
      price: route.basePrice + Math.floor(Math.random() * 200), // Add some price variation
      availableSeats: Math.floor(Math.random() * 50) + 10,
      status: 'SCHEDULED',
    };

    flights.push(morningFlight, eveningFlight);
  });

  return flights;
};

export const flightService = {
  async searchFlights(params: SearchFlightsParams): Promise<Flight[]> {
    try {
      const { data } = await api.get<{ flights: Flight[] }>('/flights/search', { params });
      return data.flights;
    } catch (error) {
      // For MVP, return mock flights if API fails
      return generateMockFlights(params);
    }
  },

  async getFlightAvailability(routeId: string, startDate: string, endDate: string): Promise<FlightAvailability[]> {
    try {
      const { data } = await api.get<{ availability: FlightAvailability[] }>('/flights/availability', {
        params: { routeId, startDate, endDate },
      });
      return data.availability;
    } catch (error) {
      // For MVP, generate mock availability data
      const route = MVP_ROUTES.find(r => r.id === routeId);
      if (!route) return [];

      const availability: FlightAvailability[] = [];
      const start = new Date(startDate);
      const end = new Date(endDate);

      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        availability.push({
          date: date.toISOString().split('T')[0],
          price: route.basePrice + Math.floor(Math.random() * 200),
          availableSeats: Math.floor(Math.random() * 50) + 10,
        });
      }

      return availability;
    }
  },

  async getFlightDetails(flightId: string): Promise<Flight> {
    try {
      const { data } = await api.get<{ flight: Flight }>(`/flights/${flightId}`);
      return data.flight;
    } catch (error) {
      // For MVP, generate mock flight details
      const [routeId] = flightId.split('-');
      const route = MVP_ROUTES.find(r => r.id === routeId);
      if (!route) throw new Error('Flight not found');

      const [, date, timeOfDay] = flightId.split('-');
      const departureTime = `${date}T${timeOfDay === 'am' ? '08' : '18'}:00:00Z`;
      const departure = new Date(departureTime);

      return {
        id: flightId,
        routeId: route.id,
        route,
        departureTime,
        arrivalTime: new Date(departure.getTime() + route.flightDuration * 60000).toISOString(),
        price: route.basePrice + Math.floor(Math.random() * 200),
        availableSeats: Math.floor(Math.random() * 50) + 10,
        status: 'SCHEDULED',
      };
    }
  },
}; 