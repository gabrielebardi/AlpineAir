import { api } from './api';

export interface Route {
  id: string;
  origin: string;
  destination: string;
  basePrice: number;
  flightDuration: number; // in minutes
  distance: number; // in kilometers
}

export const MVP_ROUTES: Route[] = [
  {
    id: 'iad-gva',
    origin: 'Washington, D.C. (IAD)',
    destination: 'Geneva (GVA)',
    basePrice: 899,
    flightDuration: 450, // 7.5 hours
    distance: 6543,
  },
  {
    id: 'jfk-zrh',
    origin: 'New York (JFK)',
    destination: 'Zurich (ZRH)',
    basePrice: 849,
    flightDuration: 440, // 7.3 hours
    distance: 6322,
  },
  {
    id: 'lhr-zrh',
    origin: 'London (LHR)',
    destination: 'Zurich (ZRH)',
    basePrice: 199,
    flightDuration: 100, // 1.7 hours
    distance: 813,
  },
];

export const routeService = {
  async getAvailableRoutes(): Promise<Route[]> {
    try {
      const { data } = await api.get<{ routes: Route[] }>('/routes');
      return data.routes;
    } catch (error) {
      // For MVP, return predefined routes if API fails
      return MVP_ROUTES;
    }
  },

  async getRouteById(routeId: string): Promise<Route | undefined> {
    try {
      const { data } = await api.get<{ route: Route }>(`/routes/${routeId}`);
      return data.route;
    } catch (error) {
      // For MVP, return predefined route if API fails
      return MVP_ROUTES.find(route => route.id === routeId);
    }
  },

  async getPopularRoutes(): Promise<Route[]> {
    try {
      const { data } = await api.get<{ routes: Route[] }>('/routes/popular');
      return data.routes;
    } catch (error) {
      // For MVP, return all predefined routes if API fails
      return MVP_ROUTES;
    }
  },

  // Helper function to get route suggestions based on input
  async getRouteSuggestions(query: string): Promise<Route[]> {
    try {
      const { data } = await api.get<{ routes: Route[] }>('/routes/suggestions', {
        params: { query },
      });
      return data.routes;
    } catch (error) {
      // For MVP, filter predefined routes based on query
      const lowercaseQuery = query.toLowerCase();
      return MVP_ROUTES.filter(
        route =>
          route.origin.toLowerCase().includes(lowercaseQuery) ||
          route.destination.toLowerCase().includes(lowercaseQuery)
      );
    }
  },
}; 