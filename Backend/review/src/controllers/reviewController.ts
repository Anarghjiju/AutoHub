import Review from '../model/review';
import { Request, Response } from 'express';

// Create a new review

export const createReview = async (req:Request , res:Response) => {
try{
    const review = await Review.create(req.body);
    res.status(201).json(review);
}
catch(err){
    res.status(500).json({message:"Error creating review", err});
}
};

//get reviews for a provider
export const getReviewsByProviderId = async (req: Request, res: Response) => {
    try {
      const reviews = await Review.find({ provider_id: req.params.providerId });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving reviews", error });
    }
  };
  
  
  // Delete a review
  export const deleteReview = async (req: Request, res: Response) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.reviewId);
      if (!review) 
        res.status(404).json({ message: "Review not found" });
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting review", error });
    }
  };
