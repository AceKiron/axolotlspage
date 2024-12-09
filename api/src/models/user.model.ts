import Mongoose from "mongoose";

export interface UserDocument extends Mongoose.Document {
    email: string;
    passwordSalt: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = new Mongoose.Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwordSalt: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default Mongoose.model<UserDocument>("User", UserSchema);