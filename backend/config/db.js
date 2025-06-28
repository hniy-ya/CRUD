import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URL);
        console.log("mongoose connected " + conn.connection.host);
    } catch (error) {
        console.error("Error connecting mongoDb" + error.message);
        process.exit(1); //one means there was a err 0 means success
    }
};
