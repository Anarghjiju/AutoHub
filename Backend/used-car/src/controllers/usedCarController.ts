import { Request, Response } from 'express';
import { usedCar } from '../models/usedCarModel';

export const createUsedCar = async (req: Request, res: Response): Promise<void> => {
    try {
        const { make, carModel, year, kmsDriven, price, sellerId, description, buyerId } = req.body;
        const newCar = new usedCar({
            make,
            carModel,
            year,
            kmsDriven,
            price,
            sellerId,
            description,
            buyerId,
            verified: false,
            listed: false
        });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ error: 'Error creating used car listing' });
    }
};

export const approveCarListing = async (req: Request, res: Response): Promise<void> => {
    try {
        const { carId } = req.params;
        const updatedCar = await usedCar.findByIdAndUpdate(carId, { verified: true, listed: true }, { new: true });
        if (!updatedCar) {
            res.status(404).json({ error: 'Car not found' });
            return;
        }
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ error: 'Error approving car listing' });
    }
};

export const getListedCars = async (req: Request, res: Response): Promise<void> => {
    try {
        const cars = await usedCar.find({ verified: true, listed: true });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching listed cars' });
    }
};
