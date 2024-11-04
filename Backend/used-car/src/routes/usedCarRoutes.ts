import express from 'express';
import { createUsedCar, approveCarListing, getListedCars,getCarById ,analyticalData,getNotApprovedCars,updateUsedCar} from '../controllers/usedCarController';

const router = express.Router();

router.post('/usedcars', createUsedCar);            
router.patch('/usedcars/approve/:carId',approveCarListing); 
router.get('/usedcars', getListedCars);     
router.get('/usedcar/:id',getCarById);
router.get('/usedcars/analytics',analyticalData);
router.get('/usedcars/pending-approval',getNotApprovedCars)
router.put('/usedcar/update/:carId',updateUsedCar);

export default router;
