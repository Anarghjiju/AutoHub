import express from 'express';

import{
    getCarById,
    getDistinctMakes,
    // deleteCarsByMake,
    // updateMakeByModel
} from '../controller/CarDetailsController';

const router = express.Router();

router.get('/id/:id',getCarById);
router.get('/makes',getDistinctMakes);
// router.delete('/make',deleteCarsByMake);
// router.put('/make',updateMakeByModel);
export default router;
