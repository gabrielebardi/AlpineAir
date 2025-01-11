import { Router } from 'express';
import type { IRouter } from 'express';
import bookingsRouter from './bookings';
import preferencesRouter from './preferences';
import searchRouter from './search';

const router: IRouter = Router();

router.use('/bookings', bookingsRouter);
router.use('/preferences', preferencesRouter);
router.use('/search', searchRouter);

export default router; 