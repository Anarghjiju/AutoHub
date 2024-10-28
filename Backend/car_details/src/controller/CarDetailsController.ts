import { Request, Response } from 'express';
import car_details, { ICarDetails } from '../model/car_details'; // Adjust the path based on your directory structure

class car_detailsController {
  // Search car_detailss by model and structure the response with primary model and variants
  async searchCarByModel(req: Request, res: Response): Promise<void> {
    const searchTerm = req.query.model as string;

    try {
      // Find car_detailss that match the search term
      const car_detailss: ICarDetails[] = await car_details.find({ model: new RegExp(`^${searchTerm}`, 'i') }).sort({ model: 1 });

      if ( car_detailss || car_detailss.length === 0) {
        res.status(404).json({ message: 'No models found.' });
        return;
      }

      // Assume the first car_details as the primary model and the rest as variants
      const mainModel = car_detailss[0];
      const variants = car_detailss.slice(1);

      // Structure the response
      const responseData = {
        mainModel: {
          id: mainModel._id,
          name: mainModel.model,
          details: mainModel.details, // include fields like price, engine, etc.
        },
        variants: variants.map(variant => ({
          id: variant._id,
          name: variant.model,
          details: variant.details, // include fields like price, engine, etc.
        })),
      };

      res.json(responseData);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }

  // Create a new car_details entry

  // Get all car_detailss or filter by query parameters (make, model, variant)
  async getCar_detailss(req: Request, res: Response): Promise<void> {
    const { make, model, variant } = req.query;

    try {
      const filter: any = {};
      if (make) filter.Make = make;
      if (model) filter.Model = model;
      if (variant) filter.Variant = variant;

      const car_detailss = await car_details.find(filter);
      res.json(car_detailss);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving car_detailss', error });
    }
  }

  // Get car_details details by ID
  async getCar_detailsById(req: Request, res: Response): Promise<void> {
    try {
      const car = await car_details.findById(req.params.id);
      if (!car) {
        res.status(404).json({ message: "car_details not found" });
      }
      res.json (car);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving car_details', error });
    }
  }

  // Update car_details details by ID
  async updateCar_details(req: Request, res: Response): Promise<void> {
    try {
      const car = await car_details.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (car) {
        res.status(404).json({ message:  'car details not found' });
      }
      res.json (car);
    } catch (error) {
      res.status(500).json({ message: 'Error updating car_details', error });
    }
  }

  // Delete a car_details by ID
  async deleteCar_details(req: Request, res: Response): Promise<void> {
    try {
      const car = await car_details.findByIdAndDelete(req.params.id);
      if (!car) {
        res.status(404).json({ message:  'car not found' });
        return;
      }
      res.json({ message: 'cardetails deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting car_details', error });
    }
  }
}

export default new car_detailsController();
