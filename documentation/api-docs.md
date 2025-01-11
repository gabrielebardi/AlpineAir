# AlpineAir API Documentation

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://alpineair.vercel.app/api`

## Authentication
All authenticated endpoints require a Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase_id_token>
```

## Error Handling
All endpoints return errors in the following format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {} // Optional additional error details
  }
}
```

## Endpoints

### Flights

#### GET /flights/search
Search for available flights.

**Query Parameters:**
- `origin`: string (required) - Origin airport code
- `destination`: string (required) - Destination airport code
- `departureDate`: string (required) - ISO date string
- `returnDate`: string (optional) - ISO date string
- `passengers`: number (required) - Number of passengers

**Response:**
```json
{
  "flights": [
    {
      "id": "string",
      "origin": "string",
      "destination": "string",
      "departureTime": "string",
      "arrivalTime": "string",
      "price": "number",
      "availableSeats": "number"
    }
  ]
}
```

### Bookings

#### POST /bookings
Create a new booking.

**Request Body:**
```json
{
  "flightId": "string",
  "passengers": [
    {
      "name": "string",
      "email": "string",
      "mealPreference": "REGULAR | VEGETARIAN | VEGAN | HALAL | KOSHER"
    }
  ]
}
```

**Response:**
```json
{
  "booking": {
    "id": "string",
    "userId": "string",
    "flightId": "string",
    "status": "PENDING | CONFIRMED | CANCELLED | COMPLETED",
    "passengers": [],
    "totalPrice": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### GET /bookings
Get all bookings for the authenticated user.

**Response:**
```json
{
  "bookings": [
    {
      "id": "string",
      "userId": "string",
      "flightId": "string",
      "status": "string",
      "passengers": [],
      "totalPrice": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### GET /bookings/:id
Get a specific booking by ID.

**Response:**
```json
{
  "booking": {
    "id": "string",
    "userId": "string",
    "flightId": "string",
    "status": "string",
    "passengers": [],
    "totalPrice": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### POST /bookings/:id/cancel
Cancel a booking.

**Response:**
```json
{
  "booking": {
    "id": "string",
    "status": "CANCELLED",
    "updatedAt": "string"
  }
}
```

### User Management

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

## Rate Limiting
- All endpoints are rate-limited to 100 requests per minute per IP address
- Authentication endpoints are limited to 5 requests per minute per IP address

## Caching
- Flight search results are cached for 5 minutes
- User profile data is cached for 1 minute
- Booking data is not cached

## Error Codes
- `AUTH_REQUIRED`: Authentication is required
- `INVALID_CREDENTIALS`: Invalid email or password
- `INVALID_TOKEN`: Invalid or expired authentication token
- `NOT_FOUND`: Requested resource not found
- `VALIDATION_ERROR`: Invalid request parameters
- `BOOKING_ERROR`: Error processing booking
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `SERVER_ERROR`: Internal server error 