import { Router } from 'express';
import { createBooking, getBookings,getBookingByUserId } from '../controllers/book-service';

const router = Router();

router.post('/book', createBooking);
router.get('/bookings', getBookings);
router.get('/bookings/:userId', getBookingByUserId);

export default router;
