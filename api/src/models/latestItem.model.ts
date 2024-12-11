import Mongoose from "mongoose";

export interface LatestItemDocument extends Mongoose.Document {
    _id: Mongoose.Schema.Types.ObjectId;

    sourceId: Mongoose.Schema.Types.ObjectId;
    postId: Mongoose.Schema.Types.ObjectId;

    kind: string;
    timestamp: Date;
    username: string;
}

export const LatestItemSchema = new Mongoose.Schema<LatestItemDocument>(
    {
        sourceId: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Source",
        },
        postId: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        kind: {
            type: String,
            required: true,
            enum: ["SOURCE_RECVEIVED_REVIEW", "POST_EDITED", "POST_PUBLISHED", "USER_REGISTERED"]
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        }
    }
);

export default Mongoose.model<LatestItemDocument>("LatestItem", LatestItemSchema);