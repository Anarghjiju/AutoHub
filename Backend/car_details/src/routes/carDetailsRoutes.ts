import express from 'express';

import{
    getCarById,
    getDistinctMakes,
    getDistinctCarsByMake,
    getCarsByMake,
    getAllCars,
    updateFieldName

} from '../controller/CarDetailsController';

const router = express.Router();

router.get('/id/:id',getCarById);
router.get('/makes',getDistinctMakes);
router.get('/cars/:Make',getCarsByMake);
router.get('/test',getAllCars);
router.get('/update',updateFieldName)
export default router;
