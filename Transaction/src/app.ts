import express from 'express';
import mongoose, { mongo } from 'mongoose';
import transactionRoutes from './routes/transactionRoutes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api',transactionRoutes);

mongoose.connect(process.env.MONGO_URI||'')
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch(error=>{
    console.error('Error connecting to MongoDB');
});

export default app;
