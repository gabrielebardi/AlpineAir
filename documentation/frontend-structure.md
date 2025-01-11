# AlpineAir Frontend Structure

## Technology Stack
- React 18 with TypeScript
- Vite for build tooling
- Material-UI (MUI) for UI components
- React Query for server state management
- Zustand for client state management
- React Hook Form with Zod for form validation
- Notistack for notifications

## Project Structure

```
client/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication related components
│   │   ├── booking/       # Booking flow components
│   │   ├── flights/       # Flight search and display components
│   │   ├── layout/        # Layout components
│   │   └── shared/        # Shared UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   ├── store/             # Zustand store definitions
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
```

## Key Components

### Authentication Components
- `LoginForm`: Handles user login
- `RegisterForm`: Handles user registration
- `AuthGuard`: Protects authenticated routes
- `AuthProvider`: Provides authentication context

### Booking Components
- `PassengerForm`: Collects passenger information
- `PaymentForm`: Handles payment information
- `BookingSummary`: Displays booking details
- `BookingConfirmation`: Shows booking confirmation

### Flight Components
- `SearchForm`: Flight search interface
- `SearchResults`: Displays flight search results
- `FlightCard`: Individual flight display
- `FlightDetails`: Detailed flight information

### Layout Components
- `MainLayout`: Main application layout
- `Navbar`: Navigation bar
- `Footer`: Application footer
- `LoadingSpinner`: Loading state indicator

## State Management

### React Query
Used for server state management:
- Flight search results
- Booking data
- User profile
- Authentication state

Example:
```typescript
const { data: flights, isLoading } = useQuery(
  ['flights', searchParams],
  () => flightService.searchFlights(searchParams),
  {
    enabled: !!searchParams,
  }
);
```

### Zustand Store
Used for client-side state management:

```typescript
interface AppStore {
  searchParams: SearchParams | null;
  selectedFlight: Flight | null;
  setSearchParams: (params: SearchParams) => void;
  setSelectedFlight: (flight: Flight) => void;
}

const useAppStore = create<AppStore>((set) => ({
  searchParams: null,
  selectedFlight: null,
  setSearchParams: (params) => set({ searchParams: params }),
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
}));
```

## Form Validation
Using React Hook Form with Zod schemas:

```typescript
const passengerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mealPreference: z.enum(['REGULAR', 'VEGETARIAN', 'VEGAN', 'HALAL', 'KOSHER']),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(passengerSchema),
});
```

## Routing
Using React Router for navigation:

```typescript
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <SearchPage /> },
      { path: '/booking/:flightId', element: <BookingPage /> },
      { path: '/bookings', element: <BookingsPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
];
```

## API Integration
Services are organized by domain:

```typescript
export const flightService = {
  searchFlights: (params: SearchParams) => api.get('/flights/search', { params }),
  getFlightDetails: (id: string) => api.get(`/flights/${id}`),
};

export const bookingService = {
  createBooking: (data: CreateBookingData) => api.post('/bookings', data),
  getUserBookings: () => api.get('/bookings'),
  getBookingDetails: (id: string) => api.get(`/bookings/${id}`),
};
```

## Error Handling
Global error handling with error boundaries and toast notifications:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    },
  },
});
```

## Styling
Using MUI's styled components and theme:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));
```

## Performance Optimization
- React.memo for expensive components
- useMemo and useCallback for memoization
- Code splitting with React.lazy
- Image optimization
- Caching strategies with React Query
``` 