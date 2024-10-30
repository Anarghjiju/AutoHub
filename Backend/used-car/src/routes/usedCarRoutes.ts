import express from 'express';
import { createUsedCar, approveCarListing, getListedCars } from '../controllers/usedCarController';

const router = express.Router();

router.post('/usedcars', createUsedCar);            
router.patch('/usedcars/approve/:carId',approveCarListing); 
router.get('/usedcars', getListedCars);             

export default router;
