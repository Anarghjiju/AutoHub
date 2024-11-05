import express from 'express';
import { getCarsBySellerId,getCarsByUserId,createUsedCar, approveCarListing, getListedCars,getCarById ,analyticalData,getNotApprovedCars,updateUsedCar} from '../controllers/usedCarController';

const router = express.Router();

router.post('/usedcars', createUsedCar);            
router.patch('/usedcars/approve/:carId',approveCarListing); 
router.get('/usedcars', getListedCars);     
router.get('/usedcar/:id',getCarById);
router.get('/usedcars/analytics',analyticalData);
router.get('/usedcars/pending-approval',getNotApprovedCars)
router.put('/usedcar/update/:carId',updateUsedCar);
router.get('/usedcars/seller/:sellerId', getCarsBySellerId);
router.get('/usedcars/buyer/:buyerId', getCarsByUserId);

export default router;
