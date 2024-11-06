import express from 'express';
import { addOrderToCar,getCarsBySellerId,getCarsByUserId,createUsedCar, getAllListedCars,approveCarListing, getListedCars,updateCarBuyerId,getCarsWithOrders,getCarById,deleteCar ,analyticalData,getNotApprovedCars,updateUsedCar} from '../controllers/usedCarController';

const router = express.Router();

router.post('/usedcars', createUsedCar);            
router.patch('/usedcars/approve/:carId',approveCarListing); 
router.get('/usedcars', getListedCars); 
router.get('/usedcars/all', getAllListedCars);     
router.get('/usedcar/:id',getCarById);
router.get('/usedcars/analytics',analyticalData);
router.get('/usedcars/pending-approval',getNotApprovedCars)
router.put('/usedcar/update/:carId',updateUsedCar);
router.get('/usedcars/seller/:sellerId', getCarsBySellerId);
router.get('/usedcars/buyer/:buyerId', getCarsByUserId);
router.patch('/usedcars/orders/:carId',addOrderToCar);
router.delete('/usedcars/:id',deleteCar);
router.get('/usedcars/orders', getCarsWithOrders); // New endpoint to fetch cars with orders
router.patch('/usedcars/:id/buyer', updateCarBuyerId);

export default router;
