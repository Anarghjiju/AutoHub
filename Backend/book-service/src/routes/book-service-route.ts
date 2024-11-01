import { Router } from 'express';
import { createBooking, getBookings } from '../controllers/book-service';

const router = Router();

router.post('/book', createBooking);
router.get('/bookings', getBookings);

export default router;
