import mongoose from "mongoose";
import { config } from "./config";

const dbConnect = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to database successfully.");
        });
        mongoose.connection.on("error", (error) => {
            console.log(`Error in  connected to database. ${error}`);
        });
        await mongoose.connect(config.databaseUrl as string);
    } catch (error) {
        console.error(`Failed to connect to database. ${error}`);
        process.exit(1);
    }
}
export default dbConnect;