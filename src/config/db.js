import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

const mongoDbUrl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.vtj37qr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const mongodbConnect = () => {
    return mongoose.connect(mongoDbUrl);
}

