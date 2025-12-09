import mongoose from 'mongoose';
import { Response } from 'express';

const connectDB = async (url: string, res?: Response) => {
    if(!url){
        console.log("DB URL not received");
    }
    try {
        await mongoose.connect(url);
        console.log("MONGO DB Connected")
        }
    catch (error: any) {
       
            console.error('MongoDB connection error:', error);
            process.exit(1);
};
}

export default connectDB;
