import mongoose,{Document, Schema} from 'mongoose';

export interface INotification extends Document{
    userId:string;
    message:string;
    date:Date;
    status: boolean;
}

const NotificationSchema:Schema = new Schema({
    userId:{
        type:String,
        required:true
    },
    message:{
        type:String,
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

export const Notification = mongoose.model<INotification>('Notification',NotificationSchema);