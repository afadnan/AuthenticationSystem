import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connect() {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI);
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',() => {
            console.log('MongoDB Connected successfully');
        });
        connection.on('error',(err) => {
            console.log('MongoDB connection error.Please make sure MOngoDB is running. '+err);
            process.exit();
        })
        
    } catch (error) {
        console.log("something goes wrong!");
        console.log(error);
        
        
    }
}
