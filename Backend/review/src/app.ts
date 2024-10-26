import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import reviewRoutes from './route/reviewRoutes';
import connectDB from './config/database';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/reviews',reviewRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Review service running on port ${PORT}`);
});