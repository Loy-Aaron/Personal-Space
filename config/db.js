import mongoose from "mongoose";
import { MONGO_URI } from "./dotenv.js";

const connectDb = async () =>  {
    try {
        mongoose.connect(MONGO_URI);
        console.log('MONGODB Connected')
    } catch (error) {
        console.error('Error in connecting to MONGODB')
    }   
};

export default connectDb;