import express from 'express';
import connectDB from './config/database';
import carDetailsRoutes from './routes/carDetailsRoutes';
import dotenv from 'dotenv';
const cors = require('cors');


dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cars',carDetailsRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT,()=>{
    console.log(`Car Details service running on port ${PORT}`);
});