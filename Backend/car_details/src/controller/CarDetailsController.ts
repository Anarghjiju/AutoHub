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


