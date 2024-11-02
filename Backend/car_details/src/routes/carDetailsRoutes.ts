import express from 'express';

import{
    getCarById,
    getDistinctMakes,
    getCarsByMake,
    getAllCars,
    updateFieldName,
    getModelsByMake,
    getRandomCars

} from '../controller/CarDetailsController';

const router = express.Router();

router.get('/id/:id',getCarById);
router.get('/makes',getDistinctMakes);
router.get('/cars/:Make',getCarsByMake);
router.get('/test',getAllCars);
router.get('/update',updateFieldName)
router.get('/models/:Make',getModelsByMake)
router.get('/random',getRandomCars)
export default router;
