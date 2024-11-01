import express from 'express';
import { createUsedCar, approveCarListing, getListedCars,getCarById } from '../controllers/usedCarController';

const router = express.Router();

router.post('/usedcars', createUsedCar);            
router.patch('/usedcars/approve/:carId',approveCarListing); 
router.get('/usedcars', getListedCars);     
router.get('/usedcar/:id',getCarById)        

export default router;
