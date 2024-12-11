import Mongoose from "mongoose";

export interface PostDocument extends Mongoose.Document {
    _id: Mongoose.Schema.Types.ObjectId;

    urlName: string;
    displayName: string;
}

export const PostSchema = new Mongoose.Schema<PostDocument>(
    {
        urlName: {
            type: String,
            required: true
        },
        displayName: {
            type: String,
            required: true
        }
    }
);

export default Mongoose.model<PostDocument>("Post", PostSchema);