import { Router } from 'express';
import type { Router as ExpressRouter, RequestHandler } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { requireAuth } from '../middleware/auth';
import type { AuthenticatedRouteHandler } from '../types';

const router: ExpressRouter = Router();

const preferencesSchema = z.object({
  seatPreference: z.enum(['window', 'aisle', 'no_preference']).optional(),
  mealPreference: z.enum(['regular', 'vegetarian', 'vegan', 'kosher', 'halal']).optional(),
  notificationPreference: z.enum(['email', 'sms', 'both', 'none']).optional(),
});

const updatePreferences: AuthenticatedRouteHandler = async (req, res) => {
  try {
    const preferences = preferencesSchema.parse(req.body);
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        preferences: {
          upsert: {
            create: preferences,
            update: preferences,
          },
        },
      },
      include: {
        preferences: true,
      },
    });
    
    res.json(updatedUser.preferences);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPreferences: AuthenticatedRouteHandler = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        preferences: true,
      },
    });
    
    res.json(user?.preferences || {});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

router.use(requireAuth as RequestHandler);
router.get('/', getPreferences as RequestHandler);
router.put('/', updatePreferences as RequestHandler);

export default router; 