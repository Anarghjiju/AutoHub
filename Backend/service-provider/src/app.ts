import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import providerRoutes from './route/providerRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/providers', providerRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Service Provider service running on port ${PORT}`);
});
