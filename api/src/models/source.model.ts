import Mongoose from "mongoose";

export interface SourceDocument extends Mongoose.Document {
    _id: Mongoose.Schema.Types.ObjectId;

    sourceHostId: Mongoose.Schema.Types.ObjectId;

    link: string;
}

export const SourceSchema = new Mongoose.Schema<SourceDocument>(
    {
        sourceHostId: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "SourceHost"
        },
        link: {
            type: String,
            required: true
        }
    }
);

export default Mongoose.model<SourceDocument>("Source", SourceSchema);