import { Router, RequestHandler } from 'express';
import { prisma } from '../lib/prisma';
import type { AuthenticatedRequest, ApiResponse } from '../src/types';
import { preferencesSchema } from '@alpineair/shared';
import type { IRouter } from 'express';
import { requireAuth } from '../src/middleware/auth';

const router: IRouter = Router();

const createPreference: RequestHandler = async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  try {
    const data = preferencesSchema.parse(authReq.body);
    const preferences = await prisma.preference.create({
      data: {
        ...data,
        userId: authReq.user.id
      }
    });
    res.json(preferences);
  } catch (error) {
    res.status(400).json({ error: 'Invalid preference data' });
  }
};

const getPreferences: RequestHandler = async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  try {
    const preferences = await prisma.preference.findMany({
      where: {
        userId: authReq.user.id
      }
    });
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
};

router.post('/', requireAuth, createPreference);
router.get('/', requireAuth, getPreferences);

export default router; 