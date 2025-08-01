// lib/dbConnect.ts
import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: 'recipe_generator',
    });

    console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI);
    if (db.connections[0].readyState) {
      console.log('✅ MongoDB is already connected');
      return;
    }

    isConnected = true;
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDB;