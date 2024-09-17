import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const db_url = process.env.DATABASE_URL

export const connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log(">>> DB is connected");
  } catch(error) {
    console.log(error);
  }   
};


