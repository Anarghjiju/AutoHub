import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
    providerId: string;
    serviceId: string;
    userId: string;
    bookingDate: Date;
    status: boolean;
    make: string;
    car_model: string;
    contact_no: string;

}

const bookingSchema: Schema = new Schema({
    providerId: { type: String, required: true },
    serviceId: { type: String, required: true },
    userId: { type: String },
    bookingDate: { type: Date, required: true },
    status: { type: Boolean, default: false },
    make: { type: String, required: true },
    car_model: { type: String, required: true },
    contact_no: { type: String, required: true }
});

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
