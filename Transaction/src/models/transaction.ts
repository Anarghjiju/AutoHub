import mongoose,{Document,Schema} from "mongoose";

export interface ITransaction extends Document{
    transactionId : string;
    carId:string;
    buyerId:string;
    sellerId:string;
    price:number;
    date:Date;
    status : boolean;
}

const  TrasactionSchema : Schema=new Schema({
    transactionId :{
        type:String,
        required : true
    },
    carId:{
        type:String,
        required : true
    },
    sellerId:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
});

export const Transaction = mongoose.model<ITransaction>('Transaction',TrasactionSchema);


