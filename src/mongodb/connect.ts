import mongoose from 'mongoose';

let mongoInstance: typeof mongoose | null = null;

const createMongoConnection = async (uri: string): Promise<typeof mongoose> => {
  if (mongoInstance) {
    console.log('Reusing existing MongoDB connection');
    return mongoInstance;
  }

  try {
    mongoInstance = await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    return mongoInstance;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default createMongoConnection;
