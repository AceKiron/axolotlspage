import Mongoose from "mongoose";

export interface SourceHostDocument extends Mongoose.Document {
    _id: Mongoose.Schema.Types.ObjectId;

    hostname: string;
}

export const SourceHostSchema = new Mongoose.Schema<SourceHostDocument>(
    {
        hostname: {
            type: String,
            required: true,
            unique: true
        }
    }
);

export default Mongoose.model<SourceHostDocument>("SourceHost", SourceHostSchema);