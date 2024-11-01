import { Request, Response } from 'express';
import {Car_details} from '../model/car_details'; // Adjust the path based on your directory structure
import mongoose from 'mongoose';

export const getCarById = async (req:Request,res:Response) => {
  try{
    console.log(req.params.id);
    const car = await Car_details.findById(req.params.id);
    if(!car)
      res.status(404).json({message :'car not found'});

    res.status(200).json(car)
  }
  catch(error){
    res.status(500).json({message: 'Error getting car'});
  }
 
};


export const getDistinctMakes = async (req: Request, res: Response) => {
  try {
    const makes = await Car_details.aggregate([
      {
        $match: {
          $or: [
            { Make: { $ne: null } },   // Exclude null 'make' values
            { Make: { $ne: "" } },
            { Make: { $ne: "null" } }      // Exclude empty string 'make' values
          ]
        }
      },
      {
        $group: {
          _id: "$Make",
          id: { $first: "$_id" } // Capture the original _id of the first unique 'make'
        }
      },
      {
        $project: {
          id: 1,             // Keep the original _id as 'id'
          name: "$_id",      // Rename '_id' from grouping to 'name'
          _id: 0             // Exclude the aggregation _id field
        }
      },
      {
        $sort: {
          name: 1 // Sort the makes in ascending order. Use -1 for descending order.
        }
      }
    ]);

    res.status(200).json(makes);
  } catch (error) {
    res.status(500).json({ message: 'Error getting distinct makes' });
  }
};


export const getDistinctCarsByMake = async (req: Request, res: Response) => {
  try {
    const result = await Car_details.aggregate([
      { $match: { Make: req.params.Make } }, // Filter by the specific make
      { $group: { _id: "$Model", car: { $first: "$$ROOT" } } }, // Group by model, get the first document for each model
      { $replaceRoot: { newRoot: "$car" } } // Replace the root to output the full document
    ]);

    if (result.length === 0) {
      res.status(404).json({ message: "No distinct models found for this make" });
    }
    else {
      // Only send response if previous check was not triggered
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting distinct cars for the make' });
  }
};






