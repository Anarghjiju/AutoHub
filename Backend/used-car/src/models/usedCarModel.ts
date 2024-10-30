import mongoose, { Document, Schema } from 'mongoose';

export interface IUsedCar extends Document {
    make: string;
    carModel: string;
    year: number;
    kmsDriven: number;
    price: number;
    sellerId: string;
    description: string;
    buyerId?: string; // Optional if a buyer hasn't been assigned yet
    verified: boolean;
    listed: boolean;
    images: {
        publicId: string;
        url: string;
    }[];
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
            publicId: { type: String, required: true }, // Make publicId required
            url: { type: String, required: true }, // Make url required
        },
    ],
    description: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: false, // Optional field
    },
    verified: {
        type: Boolean,
        default: false, // Default value for verified
    },
    listed: {
        type: Boolean,
        default: true, // Default value for listed
    },
});

export const usedCar = mongoose.model<IUsedCar>('UsedCar', UsedCarSchema);
