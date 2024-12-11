import Mongoose from "mongoose";
import Bcrypt from "bcrypt";

import UserModel from "../models/user.model";
import AppError from "../utils/appError";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import AppResult from "../constants/appResult";
import { PASSWORD_SECRET } from "../constants/env";
import { requestUpdateLatestUpdate } from "../utils/bridge";
import LatestItemModel from "../models/latestItem.model";

type RegisterUserPayload = {
    username: string;
    email: string;
    password: string;
}
export const registerUser = async (payload: RegisterUserPayload): Promise<AppResult<Mongoose.ObjectId>> => {
    if (await UserModel.exists({
        username: payload.username
    })) {
        return {
            success: false,
            err: new AppError(CONFLICT, `User with username '${payload.username} already exists.`)
        };
    }

    if (await UserModel.exists({
        email: payload.email
    })) {
        return {
            success: false,
            err: new AppError(CONFLICT, `User with email '${payload.email}' already exists.`)
        };
    }

    const model = new UserModel({
        username: payload.username,
        email: payload.email,
        password: await Bcrypt.hash(payload.password + PASSWORD_SECRET, await Bcrypt.genSalt())
    });

    await model.save();

    await new LatestItemModel({
        kind: "USER_REGISTERED",
        username: payload.username
    }).save();

    requestUpdateLatestUpdate();

    return {
        success: true,
        data: model._id
    };
}

type LoginUserPayload = {
    email: string;
    password: string;
}
export const loginUser = async (payload: LoginUserPayload): Promise<AppResult<Mongoose.ObjectId>> => {
    const user = await UserModel.findOne({
        email: payload.email
    });

    if (user) {
        if (await user.comparePassword(payload.password)) {
            return {
                success: true,
                data: user._id
            };
        } else {
            return {
                success: false,
                err: new AppError(UNAUTHORIZED, `Incorrect email or password provided.`)
            };
        }
    }
    
    return {
        success: false,
        err: new AppError(UNAUTHORIZED, `Incorrect email or password provided.`)
    };

    // const model = new UserModel({
    //     email: payload.email,
    //     passwordSalt: "ABC",
    //     passwordHash: payload.password + "D"
    // });

    // await model.save();

    // return {
    //     success: true,
    //     data: model._id
    // };
}