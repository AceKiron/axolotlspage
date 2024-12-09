import Mongoose from "mongoose";

import { MONGO_URI } from "../constants/env";

export default async () => {
    try {
        await Mongoose.connect(MONGO_URI);
        console.log("Successfully connected to MongoDB.");
    } catch (err) {
        console.error("Could not connect to MongoDB.", err);
        process.exit(1);
    }
}