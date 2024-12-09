import Mongoose from "mongoose";

import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDocument extends Mongoose.Document {
    _id: Mongoose.Schema.Types.ObjectId;
    userId: Mongoose.Schema.Types.ObjectId;

    userAgent: string;
    ip: string;

    createdAt: Date;
    expiresAt: Date;
}

export const SessionSchema = new Mongoose.Schema<SessionDocument>(
    {
        userId: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true
        },
        userAgent: {
            type: String,
            required: true
        },
        ip: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        expiresAt: {
            type: Date,
            required: true,
            default: thirtyDaysFromNow
        }
    }
);

export default Mongoose.model<SessionDocument>("Session", SessionSchema);