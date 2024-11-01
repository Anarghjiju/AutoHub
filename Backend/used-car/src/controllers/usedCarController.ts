import { Request, Response } from 'express';
import { usedCar } from '../models/usedCarModel';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: 'duzska67x',
  api_key: '563422615513164',
  api_secret: 'TFbKXaIH8OdD0V7vQxKXj2f5MOM',
});



  export const createUsedCar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { make, carModel, year, kmsDriven, price, sellerId, description, buyerId, images } = req.body;
  
      if (!make || !carModel || !year || !kmsDriven || !price || !sellerId || !description) {
        res.status(400).json({ error: 'All fields are required.' });
        return;
      }
  
      const uploadedImages: {
         publicId: string;
         url: string 
        }[] = []; 
  
      for (const image of images) {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: 'used_cars',
        });
        uploadedImages.push({
          publicId: uploadResponse.public_id, // Get publicId from Cloudinary response
          url: uploadResponse.secure_url, // URL of the uploaded image
        });
      }
  
      const newCar = new usedCar({
        make,
        carModel,
        year,
        kmsDriven,
        price,
        sellerId,
        description,
        buyerId: buyerId || null,
        images: uploadedImages, // Use the updated images array
        verified: false,
        listed: false,
      });
  
      await newCar.save();
      res.status(201).json({ message: 'Used car listing created successfully', car: newCar });
    } catch (error) {
      console.error('Error creating used car listing:', error);
      res.status(500).json({ error: 'Error creating used car listing' });
    }
  };
  


export const approveCarListing = async (req: Request, res: Response): Promise<void> => {
    try {
        const { carId } = req.params;

        const updatedCar = await usedCar.findByIdAndUpdate(carId, { verified: true, listed: true }, { new: true });

        if (!updatedCar) {
            res.status(404).json({ error: 'Car not found' });
            return;
        }

        res.status(200).json({ message: 'Car listing approved successfully', car: updatedCar });
    } catch (error) {
        console.error('Error approving car listing:', error);
        res.status(500).json({  error:'Error approving car listing' });
    }
};

export const getListedCars = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all verified and listed cars
        const cars = await usedCar.find({ verified: true, listed: true });
        res.status(200).json( cars );
    } catch (error) {
        console.error('Error fetching listed cars:', error);
        res.status(500).json({ error: 'Error fetching listed cars' });
    }
};

export const getCarById = async (req: Request, res: Response):Promise<void>=> {
  try{
    const car = await usedCar.findById(req.params.id);
    if(!car){
      res.status(404).json({"message":"No car found"});
  }
  res.json(car);
}catch(error){
  res.status(500).json({message:"Error retrieving  car"});
}
  
}
