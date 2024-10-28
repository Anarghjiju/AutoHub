import express from 'express';

import{
    getCarById
} from '../controller/CarDetailsController';

const router = express.Router();

router.get('/:id',getCarById);

export default router;
