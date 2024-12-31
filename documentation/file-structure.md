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
├── server/                      # Backend application
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   │   └── types/            # TypeScript type definitions
│   ├── tests/                 # Backend tests
│   └── package.json
│
├── documentation/              # Project documentation
│   ├── app-flow.md
│   ├── roadmap.md
│   ├── User-processes.md
│   ├── Admin-processes.md
│   ├── progress.md
│   └── file-structure.md
│
├── ios/                        # iOS application (Phase 3)
│   └── [Future iOS project structure]
│
├── shared/                     # Shared code between client and server
│   ├── constants/
│   ├── types/
│   └── utils/
│
├── scripts/                    # Build and deployment scripts
├── .github/                    # GitHub workflows
├── .gitignore
├── README.md
└── package.json
```

## Key Directories

### Client
- `components/`: Reusable UI components (buttons, forms, modals)
- `pages/`: Page-level components
- `hooks/`: Custom React hooks for shared logic
- `services/`: API service integrations
- `utils/`: Helper functions and utilities
- `styles/`: Global styles and themes
- `types/`: TypeScript interfaces and types

### Server
- `controllers/`: Request handlers
- `models/`: Database models and schemas
- `routes/`: API route definitions
- `services/`: Business logic implementation
- `utils/`: Helper functions
- `types/`: TypeScript interfaces and types

### Documentation
- Project documentation and guides
- Architecture decisions
- Process flows
- Progress tracking

### Shared
- Code shared between client and server
- Common types and interfaces
- Shared utilities and constants

## Naming Conventions

### Files and Directories
- Use kebab-case for directories: `user-profiles/`
- React components: PascalCase with .tsx extension: `BookingCard.tsx`
- Utilities and services: camelCase with .ts extension: `dateUtils.ts`
- Test files: Same name as source + .test: `BookingCard.test.tsx`

### Code Style
- Components: PascalCase
- Functions and variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Interfaces: Prefix with 'I': `IBookingData`
- Types: PascalCase: `BookingStatus` 