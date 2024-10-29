import express from 'express';

import{
    getCarById,
    getDistinctMakes,
    getCarsByMake
    // deleteCarsByMake,
    // updateMakeByModel
} from '../controller/CarDetailsController';

const router = express.Router();

router.get('/id/:id',getCarById);
router.get('/makes',getDistinctMakes);
router.get('/cars/:Make',getCarsByMake);
// router.delete('/make',deleteCarsByMake);
// router.put('/make',updateMakeByModel);
export default router;
