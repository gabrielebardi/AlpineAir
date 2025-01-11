export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Route {
  id: string;
  origin: string;
  destination: string;
  basePrice: number;
  flightDuration: number;
  distance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Flight {
  id: string;
  routeId: string;
  route: Route;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  availableSeats: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Passenger {
  name: string;
  email: string;
  seatPreference?: 'window' | 'aisle' | 'middle';
  mealPreference?: 'regular' | 'vegetarian' | 'vegan' | 'kosher' | 'halal';
}

export interface Booking {
  id: string;
  userId: string;
  user: User;
  flightId: string;
  flight: Flight;
  status: string;
  passengers: Passenger[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Preference {
  id: string;
  userId: string;
  user: User;
  routeId: string;
  route: Route;
  timeSlot: string;
  timeWindow: number;
  passengers: number;
  createdAt: Date;
  updatedAt: Date;
} 