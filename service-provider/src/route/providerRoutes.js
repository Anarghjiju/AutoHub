"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const providerController_1 = require("../controller/providerController");
const router = express_1.default.Router();
// Route to register a new provider
router.post('/', providerController_1.registerProvider);
// Route to get all providers
router.get('/', providerController_1.getAllProviders);
// Route to get a provider by their provider_id
router.get('/:provider_id', providerController_1.getProviderById);
// Route to update a provider's details
router.put('/:provider_id', providerController_1.updateProvider);
// Route to delete a provider by their provider_id
router.delete('/:provider_id', providerController_1.deleteProvider);
// Route to get a provider by a specific service_id
router.get('/service/:service_id', providerController_1.getProviderByServiceId);
// Route to add a service to a specific provider
router.post('/:provider_id/service', providerController_1.addServiceToProvider);
// Route to delete a specific service from a provider by service_id
router.delete('/:provider_id/service/:service_id', providerController_1.deleteServiceFromProvider);
exports.default = router;
