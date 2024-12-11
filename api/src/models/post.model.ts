import Mongoose from "mongoose";

export interface PostDocument extends Mongoose.Document {
    _id: Mongoose.Schema.Types.ObjectId;
    
    urlName: string;
    displayName: string;
    
    sources: Mongoose.Schema.Types.ObjectId[];
    reviews: Mongoose.Schema.Types.ObjectId[];
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
        },
        sources: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "Source"
            }
        ],
        reviews: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "Review"
            }
        ]
    }
);

export default Mongoose.model<PostDocument>("Post", PostSchema);