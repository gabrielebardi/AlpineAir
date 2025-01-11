import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import redis from '../../lib/redis';
import type { RouteHandler } from '../types';

const router: ExpressRouter = Router();

const searchFlightsSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  passengers: z.number().int().min(1).max(9),
});

const searchFlights: RouteHandler = async (req, res) => {
  try {
    const params = searchFlightsSchema.parse(req.query);
    
    // Create cache key from search parameters
    const cacheKey = `flights:${params.origin}:${params.destination}:${params.departureDate}`;
    
    // Try to get cached results
    const cachedResults = await redis.get(cacheKey);
    if (cachedResults) {
      res.json(cachedResults);
      return;
    }
    
    // If not cached, search in database
    const flights = await prisma.flight.findMany({
      where: {
        route: {
          origin: params.origin,
          destination: params.destination,
        },
        departureTime: {
          gte: new Date(params.departureDate),
          lt: new Date(new Date(params.departureDate).setDate(new Date(params.departureDate).getDate() + 1)),
        },
        availableSeats: {
          gte: params.passengers,
        },
      },
      include: {
        route: true,
      },
      orderBy: {
        departureTime: 'asc',
      },
    });

    // Cache results for 5 minutes
    await redis.set(cacheKey, JSON.stringify(flights), { ex: 300 });
    
    res.json(flights);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

router.get('/flights', searchFlights);

export default router; 