# AlpineAir

Private jet booking platform that aggregates demand for routes and enables shared charter flights.

## Prerequisites

- Node.js 18+
- npm 8+
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+

## Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL + Redis
- **Authentication**: Firebase Auth
- **Payment**: Stripe
- **Deployment**: DigitalOcean (Docker containers)

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd alpineair
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start development servers:
   ```bash
   npm run dev
   ```

## Development

- **Client**: http://localhost:3000
- **Server**: http://localhost:4000
- **API Docs**: http://localhost:4000/api-docs

## Testing

```bash
# Run all tests
npm test

# Run specific workspace tests
npm run test -w client
npm run test -w server
```

## Deployment

The application is deployed to DigitalOcean using GitHub Actions:

1. Push to `main` branch triggers staging deployment
2. Creating a release triggers production deployment

## Project Structure

```
alpineair/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared code
├── documentation/   # Project docs
└── ios/            # iOS app (Phase 3)
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

Private - All rights reserved 