import mongoose,{Document,Schema} from 'mongoose';

export interface IUsedCar extends Document{
    make:string;
    carModel:string;
    year:number;
    kmsDriven:number;
    price:number;
    sellerId:string;
    description:string;
    buyerId:string;
    verified :boolean;
    listed:boolean;
}

const UsedCarSchema :Schema =new Schema({
    make:{
        type:String,
        required :true
    },
    carModel:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    kmsDriven:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    sellerId:{
        type:  String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    buyerId:{
        type:String,
    },
    verified:{
        type:Boolean,
    },
    listed:{
        type:Boolean,
    },
});

export const usedCar = mongoose.model<IUsedCar>('UsedCar',UsedCarSchema)