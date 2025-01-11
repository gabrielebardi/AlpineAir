import { Router, RequestHandler } from 'express';
import { prisma } from '../lib/prisma';
import { bookingSchema } from '@alpineair/shared';
import type { IRouter } from 'express';
import { requireAuth } from '../src/middleware/auth';
import type { AuthenticatedRequest } from '../src/types';

const router: IRouter = Router();

const createBooking: RequestHandler = async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  try {
    const data = bookingSchema.parse(req.body);
    const flight = await prisma.flight.findUnique({
      where: { id: data.flightId },
      include: { route: true }
    });

    if (!flight) {
      res.status(404).json({ error: 'Flight not found' });
      return;
    }

    if (flight.availableSeats < data.passengers.length) {
      res.status(400).json({ error: 'Not enough seats available' });
      return;
    }

    const booking = await prisma.booking.create({
      data: {
        userId: authReq.user.id,
        flightId: data.flightId,
        status: 'CONFIRMED',
        passengers: {
          create: data.passengers
        },
        totalPrice: flight.price * data.passengers.length
      },
      include: {
        flight: {
          include: {
            route: true
          }
        },
        passengers: true
      }
    });

    // Update available seats
    await prisma.flight.update({
      where: { id: data.flightId },
      data: {
        availableSeats: flight.availableSeats - data.passengers.length
      }
    });

    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Invalid booking data' });
  }
};

const getBookings: RequestHandler = async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: authReq.user.id
      },
      include: {
        flight: {
          include: {
            route: true
          }
        },
        passengers: true
      }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const getBooking: RequestHandler = async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id: req.params.id,
        userId: authReq.user.id
      },
      include: {
        flight: {
          include: {
            route: true
          }
        },
        passengers: true
      }
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

router.post('/', requireAuth, createBooking);
router.get('/', requireAuth, getBookings);
router.get('/:id', requireAuth, getBooking);

export default router; 