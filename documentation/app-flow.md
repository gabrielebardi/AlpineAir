# AlpineAir Application Flow

## MVP Routes
For the initial MVP, we will focus on three key routes:
1. Washington, D.C. (IAD) ↔ Geneva (GVA)
   - Duration: 7.5 hours
   - Base Price: $899
2. New York (JFK) ↔ Zurich (ZRH)
   - Duration: 7.3 hours
   - Base Price: $849
3. London (LHR) ↔ Zurich (ZRH)
   - Duration: 1.7 hours
   - Base Price: $199

## User Flow

### 1. Authentication (Firebase)
- Sign in with email/password
  - Firebase Email/Password Authentication
  - Error handling for invalid credentials
  - Loading states during authentication
- Sign in with Apple ID
  - Firebase Apple OAuth Provider
  - Popup-based authentication flow
  - Error handling for failed authentication
- Registration with email/password
  - Firebase Email/Password Registration
  - Validation for password requirements
  - Error handling for existing emails
- Protected routes requiring authentication
  - React Router protection
  - Automatic redirection to login
  - Loading states while checking auth status
- Notifications for auth events
  - Success notifications for login/registration
  - Error notifications for failed attempts
  - Info notifications for logout

### 2. Flight Search
- Origin and destination selection (autocomplete from available routes)
- Date selection (single or return trip)
- Passenger count (1-9 passengers)
- Search results showing:
  - Available flights (2 per day: 8:00 AM and 6:00 PM departures)
  - Prices (base price + dynamic variation)
  - Duration
  - Available seats
  - Flight status

### 3. Booking Process
1. Flight Selection
   - Flight details
   - Price breakdown
   - Seat availability
   - Status information

2. Passenger Information
   - Name
   - Email
   - Meal preferences
     - Regular
     - Vegetarian
     - Vegan
     - Halal
     - Kosher

3. Payment
   - Credit card payment
   - Apple Pay integration
   - Order summary
   - Taxes and fees calculation

4. Confirmation
   - Booking reference
   - Flight details
   - Passenger information
   - Payment summary
   - Email confirmation

### 4. Booking Management
- View all bookings
- Booking details
  - Flight information
  - Passenger details
  - Status updates
- Cancel booking
- Manage preferences

## Data Flow

### 1. Authentication
```typescript
// Firebase Authentication
interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  error: Error | null;
}

interface LoginRequest {
  email?: string;
  password?: string;
  appleIdToken?: string;
}

interface LoginResponse {
  user: User;
  token: string; // Firebase ID token
}

// Token Refresh
interface TokenRefresh {
  currentUser: FirebaseUser;
  getIdToken(forceRefresh?: boolean): Promise<string>;
}
```

### 2. Flight Search
```typescript
SearchRequest {
  origin: string;      // e.g., "Washington, D.C. (IAD)"
  destination: string; // e.g., "Geneva (GVA)"
  departureDate: string;
  returnDate?: string;
  passengers: number;
}

SearchResponse {
  flights: Flight[];
  pricing: {
    basePrice: number;
    taxes: number;
    total: number;
  };
}
```

### 3. Booking
```typescript
BookingRequest {
  flightId: string;
  passengers: {
    name: string;
    email: string;
    mealPreference?: string;
  }[];
  paymentDetails: {
    method: 'card' | 'apple';
    token?: string;
    cardDetails?: {
      number: string;
      expiry: string;
      cvc: string;
      name: string;
    };
  };
}

BookingResponse {
  bookingId: string;
  status: string;
  confirmationCode: string;
  flightDetails: Flight;
  passengers: Passenger[];
  paymentStatus: string;
}
```

## Error Handling
1. Authentication Errors
   - Invalid credentials
   - Account not found
   - Registration failed
   - Apple Sign-in failed
   - Token refresh failed
   - Network connectivity issues

2. Search Errors
   - No flights available
   - Invalid route selection
   - Past date selection
   - Invalid passenger count

3. Booking Errors
   - Payment processing issues
   - Seat unavailability
   - Invalid passenger information
   - Booking timeout

4. System Errors
   - API connectivity issues
   - Authentication failures
   - Session timeouts
   - Payment gateway errors

## Performance Considerations
1. Client-side Caching
   - Available routes
   - Recent searches
   - User preferences
   - Authentication state
   - Firebase token caching

2. API Response Times
   - Search results < 2s
   - Booking confirmation < 5s
   - Payment processing < 3s
   - Auth operations < 1s

3. Error Recovery
   - Automatic retry for failed requests
   - Graceful degradation
   - Offline support for basic features
   - Token refresh handling

4. User Experience
   - Loading states for all async operations
   - Error messages with clear instructions
   - Success notifications for key actions
   - Form validation with immediate feedback

