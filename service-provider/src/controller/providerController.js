"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProvider = exports.deleteServiceFromProvider = exports.addServiceToProvider = exports.updateProvider = exports.getProviderByServiceId = exports.getAllProviders = exports.getProviderById = exports.registerProvider = void 0;
const provider_1 = __importDefault(require("../model/provider"));
// Register a new provider
const registerProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = yield provider_1.default.create(req.body);
        res.status(201).json(provider);
    }
    catch (error) {
        res.status(500).json({ message: "Error registering provider", error });
    }
});
exports.registerProvider = registerProvider;
// Get a provider by ID
const getProviderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = yield provider_1.default.findOne({ provider_id: req.params.provider_id });
        if (!provider)
            res.status(404).json({ message: "Provider not found" });
        res.json(provider);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving provider", error });
    }
});
exports.getProviderById = getProviderById;
// Get all providers
const getAllProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providers = yield provider_1.default.find();
        res.json(providers);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving providers", error });
    }
});
exports.getAllProviders = getAllProviders;
// Get provider by Service ID
const getProviderByServiceId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.service_id;
        const provider = yield provider_1.default.findOne({ "servicesOffered.service_id": serviceId });
        if (!provider)
            res.status(404).json({ message: "Provider not found for the given service ID" });
        res.json(provider);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving provider by service ID", error });
    }
});
exports.getProviderByServiceId = getProviderByServiceId;
// Update provider details
const updateProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = yield provider_1.default.findOneAndUpdate({ provider_id: req.params.provider_id }, req.body, { new: true });
        if (!provider)
            res.status(404).json({ message: "Provider not found" });
        res.json(provider);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating provider", error });
    }
});
exports.updateProvider = updateProvider;
// Add a service to a provider
const addServiceToProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = yield provider_1.default.findOne({ provider_id: req.params.provider_id });
        if (provider) {
            const newService = req.body;
            provider.servicesOffered.push(newService);
            yield provider.save();
            res.json({ message: "Service added to provider", provider });
        }
        res.status(404).json({ message: "Provider not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding service to provider", error });
    }
});
exports.addServiceToProvider = addServiceToProvider;
// Delete a service from a provider by Service ID
const deleteServiceFromProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = yield provider_1.default.findOne({ provider_id: req.params.provider_id });
        if (provider) {
            const serviceId = req.params.service_id;
            provider.servicesOffered = provider.servicesOffered.filter(service => service.service_id !== serviceId);
            yield provider.save();
            res.json({ message: "Service deleted from provider", provider });
        }
        res.status(404).json({ message: "Provider not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting service from provider", error });
    }
});
exports.deleteServiceFromProvider = deleteServiceFromProvider;
// Delete a provider
const deleteProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = yield provider_1.default.findOneAndDelete({ provider_id: req.params.provider_id });
        if (!provider)
            res.status(404).json({ message: "Provider not found" });
        res.json({ message: "Provider deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting provider", error });
    }
});
exports.deleteProvider = deleteProvider;
