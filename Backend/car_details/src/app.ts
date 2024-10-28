import express from 'express';
import connectDB from './config/database';
import carDetailsRoutes from './routes/carDetailsRoutes';
import dotenv from 'dotenv';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/cars',carDetailsRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT,()=>{
    console.log(`Car Details service running on port ${PORT}`);
});