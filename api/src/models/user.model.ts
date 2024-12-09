import Mongoose from "mongoose";
import Bcrypt from "bcrypt";
import { PASSWORD_SECRET } from "../constants/env";

export interface UserDocument extends Mongoose.Document {
    _id: Mongoose.Schema.Types.ObjectId;

    email: string;
    password: string;
    
    createdAt: Date;
    updatedAt: Date;

    comparePassword(plain: string): Promise<boolean>;
}

export const UserSchema = new Mongoose.Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

UserSchema.methods.comparePassword = async function (plain: string) {
    return await Bcrypt.compare(plain + PASSWORD_SECRET, this.password);
}

export default Mongoose.model<UserDocument>("User", UserSchema);