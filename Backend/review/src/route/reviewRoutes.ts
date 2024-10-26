import express from 'express';

import{
    createReview,
    getReviewsByProviderId,
    deleteReview
} from '../controllers/reviewController';


const router = express.Router();    

router.post('/',createReview);
router.get('/:providerId',getReviewsByProviderId);
router.delete('/:reviewId',deleteReview);

export default router;
