import mongoose, { Document, Schema } from 'mongoose';

export interface IUsedCar extends Document {
    make: string;
    carModel: string;
    year: number;
    kmsDriven: number;
    price: number;
    sellerId: string;
    description: string;
    buyerId?: string;
    verified: boolean;
    listed: boolean;
    isSold: boolean;
    images: {
        publicId: string;
        url: string;
    }[];
    orders: string[]; // Array to store user IDs as strings
}

const UsedCarSchema: Schema = new Schema({
    make: {
        type: String,
        required: true,
    },
    carModel: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    kmsDriven: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sellerId: {
        type: String,
        required: true,
    },
    images: [
        {
            publicId: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
    description: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    listed: {
        type: Boolean,
        default: false,
    },
    isSold: {
        type: Boolean,
        default: false,
    },
    orders: [
        {
            type: String, // Each order is stored as a plain string
        },
    ],
});

export const usedCar = mongoose.model<IUsedCar>('UsedCar', UsedCarSchema);
