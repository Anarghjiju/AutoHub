import express from 'express';
import { createUsedCar, approveCarListing, getListedCars } from '../controllers/usedCarController';

const router = express.Router();

router.post('/used-cars', createUsedCar);            
router.patch('/used-cars/approve/:carId',approveCarListing); 
router.get('/used-cars', getListedCars);             

export default router;
