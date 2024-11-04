import mongoose,{Document,Schema} from 'mongoose';

export interface IUser extends Document{
    name : string;
    uid: string;
    email:string;
    isAdmin : boolean;
    phno: number;
    createdAt : Date;
}

const UserSchema : Schema = new Schema({
    name:{
        type:String,
        required :true
    },
    uid:{
        type:String,
        required : true,
        unique:true
    },
    email:{
        type:String,
        required : true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    phno:{
        type:Number,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const User = mongoose.model<IUser>('User',UserSchema); 