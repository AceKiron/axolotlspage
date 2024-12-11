import Mongoose from "mongoose";

export interface SourceDocument extends Mongoose.Document {
    _id: Mongoose.Schema.Types.ObjectId;

    link: string;
}

export const SourceSchema = new Mongoose.Schema<SourceDocument>(
    {
        link: {
            type: String,
            required: true,
            unique: true
        }
    }
);

export default Mongoose.model<SourceDocument>("Source", SourceSchema);