import { Request, Response } from 'express';
import { Booking } from '../models/book-service';

export const createBooking = async (req: Request, res: Response) => {
    const { providerId, serviceId, userId, bookingDate, make, car_model, contact_no } = req.body;

    try {
        const newBooking = new Booking({ providerId, serviceId, userId, bookingDate, make, car_model, contact_no});
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Error creating booking' });
    }
};

export const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bookings' });
    }
};

