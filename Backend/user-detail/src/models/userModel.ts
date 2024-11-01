import mongoose,{Document,Schema} from 'mongoose';

export interface IUser extends Document{
    name : string;
    email:string;
    role : string;
    password:string;
    boughtCars:string[];
    soldCars : string[];
    createdAt : Date;
}

const UserSchema : Schema = new Schema({
    name:{
        type:String,
        required :true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    role:{
        type:String,
        enum :['admin','user'],
        default:'user'
    },
    boughtCars:[{
        type:Schema.Types.ObjectId,
        ref :'UsedCar'
    }],
    soldCars:[
        {
            type:Schema.Types.ObjectId,
            ref:'UsedCar'
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const User = mongoose.model<IUser>('User',UserSchema); 