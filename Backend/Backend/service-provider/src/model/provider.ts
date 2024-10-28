import mongoose, { Schema, Document } from 'mongoose';

export interface IService {
  service_id: string; // Unique identifier for the service
  service_name: string;
  service_price: number;
  service_duration: number; // Duration in minutes
  service_description: string;
}

export interface IProvider extends Document {
  provider_id: string; // Unique identifier for the provider
  name: string;
  contactInfo: string;
  location: string;
  servicesOffered: IService[]; // Array of service objects
  availability: boolean;
  contact: string;
}

const ServiceSchema: Schema = new Schema({
  service_id: { type: String, required: true },
  service_name: { type: String, required: true },
  service_price: { type: Number, required: true },
  service_duration: { type: Number, required: true }, // Duration in minutes
  service_description: { type: String, required: true },
});

const ProviderSchema: Schema = new Schema({
  provider_id: { type: String, required: true, unique: true }, // Unique identifier for the provider
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  location: { type: String, required: true },
  servicesOffered: [ServiceSchema], // Array of service objects
  availability: { type: Boolean, default: true },
  contact: { type: String, required: true },
});

export default mongoose.model<IProvider>('Provider', ProviderSchema);
