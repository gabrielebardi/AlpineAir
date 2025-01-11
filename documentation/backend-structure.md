# AlpineAir Backend Structure

## Technology Stack
- Vercel Serverless Functions
- TypeScript
- PostgreSQL (Vercel Storage)
- Redis (Upstash)
- Firebase Auth
- Prisma ORM

## Project Structure

```
server/
├── api/                  # API routes (Vercel Serverless Functions)
├── prisma/              # Database schema and migrations
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── validation/      # Request validation schemas
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Flights Table
```sql
CREATE TABLE flights (
  id VARCHAR(255) PRIMARY KEY,
  origin VARCHAR(3) NOT NULL,
  destination VARCHAR(3) NOT NULL,
  departure_time TIMESTAMP NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  available_seats INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  flight_id VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (flight_id) REFERENCES flights(id)
);
```

### Passengers Table
```sql
CREATE TABLE passengers (
  id VARCHAR(255) PRIMARY KEY,
  booking_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  seat_number VARCHAR(10),
  meal_preference VARCHAR(20),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

## API Structure

### Controllers
Handle request/response logic:

```typescript
export class FlightController {
  static async search(req: Request, res: Response) {
    const { origin, destination, departureDate } = req.query;
    const flights = await FlightService.search({
      origin,
      destination,
      departureDate,
    });
    return res.json({ flights });
  }
}
```

### Services
Implement business logic:

```typescript
export class FlightService {
  static async search(params: SearchParams) {
    const flights = await prisma.flights.findMany({
      where: {
        origin: params.origin,
        destination: params.destination,
        departureTime: {
          gte: params.departureDate,
        },
      },
    });
    return flights;
  }
}
```

### Middleware

#### Authentication
```typescript
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) throw new Error('No token provided');
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

#### Rate Limiting
```typescript
export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});
```

## Caching Strategy

### Redis Cache Implementation
```typescript
export class CacheService {
  static async get(key: string) {
    return redis.get(key);
  }

  static async set(key: string, value: any, ttl: number) {
    return redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  static async invalidate(key: string) {
    return redis.del(key);
  }
}
```

### Cache Keys
- Flight search: `flights:search:${origin}:${destination}:${date}`
- User profile: `user:${userId}`
- Booking details: `booking:${bookingId}`

## Error Handling

### Custom Error Classes
```typescript
export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 400,
    public details?: any
  ) {
    super(message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super('VALIDATION_ERROR', message, 400, details);
  }
}
```

### Global Error Handler
```typescript
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
  }

  return res.status(500).json({
    error: {
      code: 'SERVER_ERROR',
      message: 'Internal server error',
    },
  });
};
```

## Deployment

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/$1.ts"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url",
    "REDIS_URL": "@redis_url",
    "FIREBASE_PROJECT_ID": "@firebase_project_id"
  }
}
```

## Security Measures
- CORS configuration
- Helmet middleware
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
``` 