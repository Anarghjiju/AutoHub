import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import providerRoutes from './route/providerRoutes';
const cors = require('cors');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/providers', providerRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Service Provider service running on port ${PORT}`);
});
