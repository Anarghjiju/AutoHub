import mongoose,{Schema,Document} from "mongoose";

export interface ICarDetails extends Document {
    Make: string;
    Model: string;	
    Variant: string;	
    Ex_Showroom_Price: string;
    Fuel_Type: string;
    Power: string;
    Torque: string;
    Displacement: string;	
    Fuel_Tank_Capacity: string;	
    Type: string;	
    Body_Type: string;	
    Doors: string;
    Seating_Capacity: string;	
    ARAI_Certified_Mileage: string;	
    Length: string;	
    Width: string;	
    Height: string;	
    Kerb_Weight: string;	
    Ground_Clearance: string;	
    Front_Brakes: string;	
    Rear_Brakes: string;	
    ABS: string;
    Electric_Range: string;
    Variants: string[];
    imageUrls: string[];

}

const CarDetailsSchema : Schema = new Schema({
  Make: { type: String, required: true },
  Model: { type: String, required: true },
  Ex_Showroom_Price: { type: String, required: true },
  Displacement: { type: String, required: true },
  Fuel_Tank_Capacity: { type: String, required: true },
  Fuel_Type: { type: String, required: true },
  Height: { type: String, required: true },
  Length: { type: String, required: true },
  Width: { type: String, required: true },
  Body_Type: { type: String, required: true },
  Doors: { type: Number, required: true },
  ARAI_Certified_Mileage: { type: String, required: true },
  Kerb_Weight: { type: String, required: true },
  Ground_Clearance: { type: String, required: true },
  Front_Brakes: { type: String, required: true },
  Rear_Brakes: { type: String, required: true },
  Power: { type: String, required: true },
  Torque: { type: String, required: true },
  Seating_Capacity: { type: Number, required: true },
  Type: { type: String, required: true },
  Electric_Range: { type: String, default: null },
  Variants: { type: [String], default: [] },
  imageUrls: { type: [String], default: [] }
})

export const Car_details= mongoose.model<ICarDetails>('Car_details',CarDetailsSchema,'newcarsdata');