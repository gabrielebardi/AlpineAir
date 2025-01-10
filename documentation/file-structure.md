# AlpineAir File Structure

## Project Organization

```
alpineair/
├── client/                      # Frontend application
│   ├── public/                  # Static files
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   ├── styles/            # Global styles
│   │   └── types/             # TypeScript type definitions
│   ├── tests/                  # Frontend tests
│   └── package.json
│
├── api/                        # Vercel Serverless Functions
│   ├── auth/                  # Authentication endpoints
│   ├── flights/              # Flight management endpoints
│   ├── bookings/            # Booking endpoints
│   ├── webhooks/            # External service webhooks
│   └── utils/               # Shared API utilities
│
├── documentation/              # Project documentation
│   ├── app-flow.md
│   ├── roadmap.md
│   ├── User-processes.md
│   ├── Admin-processes.md
│   ├── progress.md
│   └── file-structure.md
│
├── shared/                     # Shared code between client and API
│   ├── constants/
│   ├── types/
│   └── utils/
│
├── .github/                    # GitHub workflows
│   └── workflows/
│       └── ci.yml             # Continuous Integration
│
├── ios/                        # iOS application (Phase 3)
│   └── [Future iOS project structure]
│
├── .env.example               # Environment variables template
├── .gitignore
├── README.md
├── package.json               # Root package.json for workspaces
└── vercel.json               # Vercel deployment configuration
```

## Key Directories

### Client
- `components/`: Reusable UI components (buttons, forms, modals)
- `pages/`: Page-level components (follows Next.js/Vercel conventions)
- `hooks/`: Custom React hooks for shared logic
- `services/`: API service integrations
- `utils/`: Helper functions and utilities
- `styles/`: Global styles and themes
- `types/`: TypeScript interfaces and types

### API
- `auth/`: Authentication endpoints
- `flights/`: Flight management endpoints
- `bookings/`: Booking management endpoints
- `webhooks/`: External service webhook handlers
- `utils/`: Shared API utilities and middleware

### Documentation
- Project documentation and guides
- Architecture decisions
- Process flows
- Progress tracking

### Shared
- Code shared between client and API
- Common types and interfaces
- Shared utilities and constants

## Naming Conventions

### Files and Directories
- Use kebab-case for directories: `user-profiles/`
- React components: PascalCase with .tsx extension: `BookingCard.tsx`
- API endpoints: kebab-case with .ts extension: `create-booking.ts`
- Test files: Same name as source + .test: `BookingCard.test.tsx`

### Code Style
- Components: PascalCase
- Functions and variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Interfaces: Prefix with 'I': `IBookingData`
- Types: PascalCase: `BookingStatus`

## Vercel Configuration
- `vercel.json`: Deployment settings and redirects
- Environment variables managed in Vercel dashboard
- Automatic branch deployments
- API routes handled by serverless functions 