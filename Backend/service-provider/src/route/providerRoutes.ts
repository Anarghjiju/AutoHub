import express from 'express';
import {
  registerProvider,
  getProviderById,
  updateProvider,
  deleteProvider,
  getAllProviders,
  getProviderByServiceId,
  addServiceToProvider,
  deleteServiceFromProvider
} from '../controller/providerController';

const router = express.Router();

// Route to register a new provider
router.post('/', registerProvider);

// Route to get all providers
router.get('/', getAllProviders);

// Route to get a provider by their provider_id
router.get('/:provider_id', getProviderById);

// Route to update a provider's details
router.put('/:provider_id', updateProvider);

// Route to delete a provider by their provider_id
router.delete('/:provider_id', deleteProvider);

// Route to get a provider by a specific service_id
router.get('/service/:service_id', getProviderByServiceId);

// Route to add a service to a specific provider
router.post('/:provider_id/service', addServiceToProvider);

// Route to delete a specific service from a provider by service_id
router.delete('/:provider_id/service/:service_id', deleteServiceFromProvider);

export default router;
