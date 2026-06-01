import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/index.routes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

const connectToMongoDB = async () => {
  if (!process.env.MONGO) {
    throw new Error('MONGO environment variable is not defined');
  }
  await mongoose.connect(process.env.MONGO);
  console.log('Connected to MongoDB');
};

mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
mongoose.connection.on('connected', () => console.log('MongoDB connected'));

app.use('/api/v1', router);

const startServer = async () => {
  try {
    await connectToMongoDB();
    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
