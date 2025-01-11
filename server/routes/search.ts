import { Router, RequestHandler } from 'express';
import { prisma } from '../lib/prisma';
import redis from '../lib/redis';
import { searchFlightsSchema } from '@alpineair/shared';
import type { IRouter } from 'express';

const router: IRouter = Router();

const searchFlights: RequestHandler = async (req, res) => {
  try {
    const searchParams = searchFlightsSchema.parse(req.body);
    const cacheKey = `flights:${JSON.stringify(searchParams)}`;

    // Try to get from cache first
    const cachedResults = await redis.get(cacheKey);
    if (cachedResults) {
      res.json(JSON.parse(cachedResults));
      return;
    }

    // If not in cache, search in database
    const flights = await prisma.flight.findMany({
      where: {
        route: {
          origin: searchParams.origin,
          destination: searchParams.destination
        },
        departureTime: {
          gte: new Date(searchParams.departureDate)
        },
        availableSeats: {
          gte: searchParams.passengers
        }
      },
      include: {
        route: true
      }
    });

    // Cache the results for 5 minutes
    await redis.set(cacheKey, JSON.stringify(flights), {
      EX: 300 // 5 minutes
    });

    res.json(flights);
  } catch (error) {
    res.status(400).json({ error: 'Invalid search parameters' });
  }
};

router.post('/', searchFlights);

export default router; 