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
        isSold:false,
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
        const cars = await usedCar.find({ verified: true,isSold:false });
        res.status(200).json( cars );
    } catch (error) {
        console.error('Error fetching listed cars:', error);
        res.status(500).json({ error: 'Error fetching listed cars' });
    }
};

export const getAllListedCars = async (req: Request, res: Response): Promise<void> => {
  try {
      const cars = await usedCar.find({ verified: true});
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

export const analyticalData = async (req: Request, res: Response): Promise<void> => {
  try {
      const totalSoldCars = await usedCar.countDocuments({ isSold: true });
      const totalUnSoldCars = await usedCar.countDocuments({ isSold: false,listed :true,verified:true });
      const totalPendingApproval = await usedCar.countDocuments({ verified: false, listed: false });

      const soldCars = await usedCar.find({ isSold: true });
      const totalIncome = soldCars.reduce((sum, car) => sum + (car.price*0.1), 0);

      // Group by `make` and count the number of sold cars for each make
      const salesByMake = await usedCar.aggregate([
          { $match: { isSold: true } },
          { $group: { _id: "$make", count: { $sum: 1 } } }
      ]);

      res.status(200).json({ 
          totalSoldCars, 
          totalIncome, 
          totalUnSoldCars, 
          totalPendingApproval, 
          salesByMake 
      });
  } catch (error) {
      console.error('Error fetching analytics data:', error);
      res.status(500).json({ error: 'Error fetching analytics data' });
  }
};


export const getNotApprovedCars = async (req: Request, res: Response): Promise<void> => {
  try {
      const cars = await usedCar.find({ verified: false, listed: false });
      res.status(200).json( cars );
  } catch (error) {
      console.error('Error fetching listed cars:', error);
      res.status(500).json({ error: 'Error fetching listed cars' });
  }
};



export const updateUsedCar = async (req: Request, res: Response): Promise<void> => {
  try {
      const { carId } = req.params;
      const updates = req.body; // Capture the fields to update from the request body
      console.log(updates);
      // Update the used car document with the provided fields
      const updatedCar = await usedCar.findByIdAndUpdate(carId, updates, { new: true });

      if (!updatedCar) {
          res.status(404).json({ error: 'Car not found' });
          return;
      }

      res.status(200).json({ message: 'Car listing updated successfully', car: updatedCar });
  } catch (error) {
      console.error('Error updating car listing:', error);
      res.status(500).json({ error: 'Error updating car listing' });
  }
};

export const getCarsByUserId = async (req: Request, res: Response) => {
  const { buyerId } = req.params; // Assume userId is passed as a URL parameter

  try {
      const cars = await usedCar.find({ buyerId: buyerId }).exec(); // Fetch cars associated with the buyerId
      if (!cars.length) {
          res.status(404).json({ message: 'No cars found for this user.' });
      }
      else{
      res.status(200).json(cars);
      }
  } catch (error) {
      console.error('Error fetching cars by userId:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get used car details based on sellerId
export const getCarsBySellerId = async (req: Request, res: Response) => {
  const { sellerId } = req.params; // Assume sellerId is passed as a URL parameter

  try {
      const cars = await usedCar.find({ sellerId: sellerId ,isSold:true}).exec(); // Fetch cars associated with the sellerId
      if (!cars.length) {
          res.status(404).json({ message: 'No cars found for this seller.' });
      }
      else{
      res.status(200).json(cars);
      }
  } catch (error) {
      console.error('Error fetching cars by sellerId:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

export const addOrderToCar = async (req: Request, res: Response): Promise<void> => {
  try {
      const { carId } = req.params;
      const { userId } = req.body;

      // Find the car and update by adding the userId to the orders array
      const updatedCar = await usedCar.findByIdAndUpdate(
          carId,
          { $addToSet: { orders: userId } }, // $addToSet ensures no duplicate user IDs
          { new: true }
      );

      if (!updatedCar) {
          res.status(404).json({ error: 'Car not found' });

      }

      res.status(200).json({ message: 'Order added successfully', car: updatedCar });
  } catch (error) {
      console.error('Error adding order to car:', error);
      res.status(500).json({ error: 'Error adding order to car' });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {

      // Find and delete the car by its ID
      const deletedCar = await usedCar.findByIdAndDelete(req.params.id);

      if (!deletedCar) {
          res.status(404).json({ error: 'Car not found' });
        
      }
      else{

      res.status(200).json({ message: 'Car deleted successfully', car: deletedCar });
      }
  } catch (error) {
      console.error('Error deleting car:', error);
      res.status(500).json({ error: 'Error deleting car' });
  }
};


export const getCarsWithOrders = async (req: Request, res: Response): Promise<void> => {
  try {
      const cars = await usedCar.find({ orders: { $exists: true, $not: { $size: 0 } } }); // Find cars with at least one order
      res.status(200).json(cars);
  } catch (error) {
      console.error('Error fetching cars with orders:', error);
      res.status(500).json({ error: 'Error fetching cars with orders' });
  }
};
export const updateCarBuyerId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { buyerId } = req.body; // Get the new buyer ID from the request body

    if (!buyerId) {
      res.status(400).json({ error: 'Buyer ID is required' });
      return;
    }

    // Find and update the car by adding the buyer ID, setting isSold to true, and listed to false
    const updatedCar = await usedCar.findByIdAndUpdate(
      req.params.id,
      {
        buyerId,
        isSold: true,    // Mark car as sold
        listed: false     // Unlist the car
      },
      { new: true } // Return the updated document
    );

    // Check if the car was found and updated
    if (!updatedCar) {
      res.status(404).json({ error: 'Car not found' });
    }
    else{
    res.status(200).json({ message: 'Buyer ID and sale status updated successfully', car: updatedCar });
    }
  } catch (error) {
    console.error('Error updating buyer ID and sale status:', error);
    res.status(500).json({ error: 'Error updating buyer ID and sale status' });
  }
};
