import Mongoose from "mongoose";

export interface ReviewDocument extends Mongoose.Document {
    _id: Mongoose.Schema.Types.ObjectId;

    userId: Mongoose.Schema.Types.ObjectId;

    score: number;

    note?: string;
}

export const ReviewSchema = new Mongoose.Schema<ReviewDocument>(
    {
        userId: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        score: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        note: {
            type: String
        }
    }
);

export default Mongoose.model<ReviewDocument>("Review", ReviewSchema);