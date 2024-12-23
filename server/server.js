import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';
import router from './routes/index.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

const connectToMongoDB = async () => {
    try {
      // Check if MONGO environment variable is defined
      if (!process.env.MONGO) {
        throw new Error('MONGO environment variable is not defined');
      }
  
      await mongoose.connect(process.env.MONGO);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Exit the process with an error
    }
  };
  
  // MongoDB connection event listeners
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
  
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

// Routes
app.use('/api/v1', router);

// Start server
const startServer = async () => {
  await connectToMongoDB(); // Wait for the connection to be established
  
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

// Execute the server startup
startServer();
