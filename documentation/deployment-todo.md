# Deployment Todo List

## 1. Vercel Account Setup ✓
- [x] Create a Vercel account at https://vercel.com
- [x] Install Vercel CLI: `pnpm install -g vercel`
- [x] Run `vercel login` and follow the prompts
- [x] Share your Vercel username with me (gabrielebardi)

## 2. Firebase Setup ✓
- [x] Create a Firebase account at https://firebase.google.com
- [x] Create a new Firebase project named "alpineair"
- [x] Share the Firebase project ID with me (alpineair-c130)
- [x] Create a web app in the Firebase project (alpineair-app)
- [x] Enable Authentication with Email/Password
- [ ] Set up security rules for Firebase services

## 3. Database Setup ✓
- [x] Create a Vercel account (completed in step 1)
- [x] Enable Vercel Storage
- [x] Create a new PostgreSQL database
- [x] Share the database connection string

## 4. Redis Setup ✓
- [x] Create an Upstash account
- [x] Create a new Redis database
- [x] Select the "Frankfurt" region
- [x] Share the Redis connection details

## Next Immediate Steps
1. Set up GitHub Integration:
   - Connect GitHub repository to Vercel
   - Configure automatic deployments
   - Set up environment variables in Vercel:
     ```
     DATABASE_URL=[Neon PostgreSQL connection string - saved securely]
     UPSTASH_REDIS_REST_URL=[Upstash Redis URL - saved securely]
     UPSTASH_REDIS_REST_TOKEN=[Upstash Redis Token - saved securely]
     ```

2. Configure GitHub Actions:
   - Set up CI/CD pipeline
   - Add linting and testing steps
   - Configure automatic deployments to Vercel

## Next Steps After Todo Completion
1. Configure the project for deployment
2. Set up environment variables:
   - [x] DATABASE_URL
   - [x] REDIS_URL
   - [ ] Firebase config
3. Configure the database schema
4. Set up Redis caching
5. Deploy the application

## Notes
- All credentials should be shared securely
- We'll need to set up proper security rules
- The deployment process will take about 30-45 minutes once everything is set up
- We can use the free tier for all services during development
- Remember to never commit API keys or sensitive credentials to Git

## Cost Estimates (Monthly)
- Vercel: Free tier available
  - PostgreSQL: 256MB storage, 20 connections ✓
  - Bandwidth: 1GB included
- Firebase: Free tier available
  - Authentication: 10K/month ✓
  - Storage: 5GB
- Redis: Free tier available ✓
  - 256MB data
  - 2000 req/day
- Total for development: $0

## Deployment Strategy
1. Initial Deployment:
   - Deploy without custom domain
   - Verify all functionality
   - Test authentication flow
   - Validate database connections
   - Check Redis caching

2. Post-Deployment:
   - Monitor application performance
   - Set up error tracking
   - Consider adding custom domain if needed
   - Implement monitoring tools if required

## Questions Answered
1. Custom Domain: No (for now)
2. Region: Frankfurt (confirmed)
3. Monitoring: Basic Vercel monitoring for now
4. GitHub Integration: Yes, with automatic deployments

Would you like me to proceed with setting up the GitHub integration and deployment configuration? 