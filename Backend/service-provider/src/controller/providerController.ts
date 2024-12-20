import { Request, Response } from 'express';
import Provider, { IProvider, IService } from '../model/provider';



export const registerProvider = async (req: Request, res: Response) => {
  try {
    const {provider_id, name, provider_make, contactInfo, location, availability } = req.body;

    const providerData = {
      provider_id,
      name,
      provider_make,
      contactInfo,
      location,
      availability,
      servicesOffered: req.body.servicesOffered || [], // Set to empty array if not provided
    };

    const provider = await Provider.create(providerData);
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: "Error registering provider", error });
  }
};


// Get a provider by ID
export const getProviderById = async (req: Request, res: Response) => {
  try {
    const provider = await Provider.findOne({ provider_id: req.params.provider_id });
    if (!provider) 
      res.status(404).json({ message: "Provider not found" });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving provider", error });
  }
};

// Get all providers
export const getAllProviders = async (req: Request, res: Response) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving providers", error });
  }
};

// Get provider by Service ID
export const getProviderByServiceId = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.service_id;
    const provider = await Provider.findOne({ "servicesOffered.service_id": serviceId });
    if (!provider) 
      res.status(404).json({ message: "Provider not found for the given service ID" });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving provider by service ID", error });
  }
};

// Update provider details
export const updateProvider = async (req: Request, res: Response) => {
  try {
    const provider = await Provider.findOneAndUpdate(
      { provider_id: req.params.provider_id },
      req.body,
      { new: true }
    );
    if (!provider) 
      res.status(404).json({ message: "Provider not found" });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: "Error updating provider", error });
  }
};

// Add a service to a provider
export const addServiceToProvider = async (req: Request, res: Response) => {
  try {
    const provider = await Provider.findOne({ provider_id: req.params.provider_id });
    if (provider) {
      const newService: IService = req.body;
      provider.servicesOffered.push(newService);
      await provider.save();
      res.json({ message: "Service added to provider", provider });
    }
    else{
    res.status(404).json({ message: "Provider not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding service to provider", error });
  }
};

// Delete a service from a provider by Service ID
export const deleteServiceFromProvider = async (req:Request, res:Response) :Promise<void>=> {
  try {
      const provider = await Provider.findOne({ provider_id: req.params.provider_id });
      
      if (provider) {
          const serviceId = req.params.service_id;
          provider.servicesOffered = provider.servicesOffered.filter(service => service.service_id !== serviceId);
          await provider.save();

      res.json({ message: "Service deleted from provider", provider });
      }
      else{

      // Send a 404 response if provider is not found and return immediately
       res.status(404).json({ message: "Provider not found" });
    }
      
  } catch (error) {
      // Send a 500 response on error and return immediately
      res.status(500).json({ message: "Error deleting service from provider", error });
  }
};



// Delete a provider
export const deleteProvider = async (req: Request, res: Response) => {
  try {
    const provider = await Provider.findOneAndDelete({ provider_id: req.params.provider_id });
    if (!provider) 
      res.status(404).json({ message: "Provider not found" });
    res.json({ message: "Provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting provider", error });
  }
};

//get all providers for a make
export const getProvidersByMake = async (req: Request, res: Response) => {
  try {
    const providers = await Provider.find({ provider_make: req.params.make });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving providers", error });
  }
};