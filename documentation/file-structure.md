# AlpineAir File Structure

## Project Organization

```
alpineair/
├── client/                      # Frontend application
│   ├── public/                  # Static files
│   └── src/
│       ├── components/          # Reusable UI components
│       │   ├── auth/           # Authentication components
│       │   ├── booking/        # Booking flow components
│       │   ├── flights/        # Flight search components
│       │   ├── layout/         # Layout components
│       │   └── shared/         # Shared UI components
│       ├── pages/              # Page components
│       ├── hooks/              # Custom React hooks
│       ├── services/           # API service layer
│       ├── store/              # Zustand store definitions
│       ├── types/              # TypeScript type definitions
│       └── utils/              # Utility functions
│
├── server/                      # Backend application
│   ├── api/                    # API routes (Vercel Functions)
│   ├── prisma/                 # Database schema and migrations
│   └── src/
│       ├── controllers/        # Request handlers
│       ├── middleware/         # Express middleware
│       ├── services/           # Business logic
│       ├── utils/              # Utility functions
│       └── validation/         # Request validation schemas
│
├── documentation/              # Project documentation
│   ├── api-docs.md            # API documentation
│   ├── frontend-structure.md  # Frontend architecture
│   ├── backend-structure.md   # Backend architecture
│   ├── app-flow.md           # Application flow
│   ├── roadmap.md            # Development roadmap
│   ├── progress.md           # Project progress
│   ├── file-structure.md     # File structure guide
│   ├── User-processes.md     # User workflows
│   └── Admin-processes.md    # Admin workflows
│
├── shared/                     # Shared code between client and server
│   ├── src/
│   │   ├── types/            # Shared TypeScript types
│   │   ├── constants/        # Shared constants
│   │   └── utils/            # Shared utilities
│   └── package.json
│
├── .github/                    # GitHub workflows
│   └── workflows/
│       └── ci.yml             # Continuous Integration
│
├── .env.example               # Environment variables template
├── .gitignore
├── README.md
├── package.json               # Root package.json for workspaces
└── vercel.json               # Vercel deployment configuration
```

## Key Directories

### Client (`client/`)
- `components/`: Reusable UI components organized by domain
  - `auth/`: Authentication-related components (LoginForm, RegisterForm)
  - `booking/`: Booking flow components (PassengerForm, PaymentForm)
  - `flights/`: Flight search components (SearchForm, SearchResults)
  - `layout/`: Layout components (MainLayout, Navbar)
  - `shared/`: Shared UI components (LoadingSpinner, ErrorBoundary)
- `pages/`: Page-level components
- `hooks/`: Custom React hooks for shared logic
- `services/`: API service integrations
- `store/`: Zustand store definitions
- `types/`: TypeScript type definitions
- `utils/`: Helper functions and utilities

### Server (`server/`)
- `api/`: Vercel Serverless Functions
- `prisma/`: Database schema and migrations
- `src/`: Server source code
  - `controllers/`: Request handlers
  - `middleware/`: Express middleware (auth, rate limiting)
  - `services/`: Business logic
  - `utils/`: Utility functions
  - `validation/`: Request validation schemas

### Documentation (`documentation/`)
- `api-docs.md`: API endpoints and usage
- `frontend-structure.md`: Frontend architecture details
- `backend-structure.md`: Backend architecture details
- `app-flow.md`: Application flow and processes
- `roadmap.md`: Development roadmap and phases
- `progress.md`: Project progress tracking
- `file-structure.md`: File structure documentation
- `User-processes.md`: User workflow documentation
- `Admin-processes.md`: Admin workflow documentation

### Shared (`shared/`)
- `types/`: Shared TypeScript interfaces and types
- `constants/`: Shared constants (routes, config)
- `utils/`: Shared utility functions

## Naming Conventions

### Files and Directories
- React components: PascalCase with .tsx extension
  - Example: `PassengerForm.tsx`, `FlightCard.tsx`
- API endpoints: kebab-case with .ts extension
  - Example: `create-booking.ts`, `search-flights.ts`
- Utility functions: camelCase with .ts extension
  - Example: `formatDate.ts`, `validateInput.ts`
- Test files: Same name as source + .test
  - Example: `PassengerForm.test.tsx`

### Code Style
- Components: PascalCase
  - Example: `BookingForm`, `FlightCard`
- Functions and variables: camelCase
  - Example: `handleSubmit`, `flightData`
- Constants: UPPER_SNAKE_CASE
  - Example: `MAX_PASSENGERS`, `API_BASE_URL`
- Types and Interfaces: PascalCase
  - Example: `BookingData`, `FlightDetails`
- Custom hooks: use prefix
  - Example: `useFlightSearch`, `useBooking`

## Environment Configuration
- `.env.example`: Template for required environment variables
- Environment variables managed in Vercel dashboard:
  - `DATABASE_URL`: PostgreSQL connection string
  - `REDIS_URL`: Redis connection string
  - `FIREBASE_PROJECT_ID`: Firebase project identifier

## Deployment Configuration
- `vercel.json`: Vercel deployment settings
  - API routes configuration
  - Build settings
  - Environment variable bindings
- Automatic deployments:
  - Production: main branch
  - Preview: Pull requests
  - Development: Feature branches
``` 
</rewritten_file>