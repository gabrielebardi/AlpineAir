import { RequestHandler } from 'express';
import { auth } from '../../src/lib/firebase';
import { prisma } from '../../lib/prisma';
import type { AuthenticatedRequest } from '../types';

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);

    const user = await prisma.user.findUnique({
      where: { firebaseId: decodedToken.uid }
    });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}; 