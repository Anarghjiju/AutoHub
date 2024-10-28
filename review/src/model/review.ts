import mongoose,{Schema, Document} from "mongoose";

export interface IReview extends Document {
    user_id: string;
    provider_id: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

const ReviewSchema : Schema = new Schema({
    user_id: {type: String, required:true},
    provider_id: {type: String, required:true},
    rating: {type: Number, required:true},
    comment: {type: String, required:true},
    createdAt: {type: Date, default: Date.now}
});

export default mongoose.model<IReview>('Review',ReviewSchema);

