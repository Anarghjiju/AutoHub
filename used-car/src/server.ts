import express from 'express';
import mongoose from 'mongoose';
import usedCarRoutes from './routes/usedCarRoutes';

const app =express();
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/usedCardb')
.then(()=>console.log('Connected to mongoDb'))
.catch((error)=>console.log('not connected to mongoDb'));


app.use('/api',usedCarRoutes);

const PORT=process.env.PORT || 3001;

app.listen(PORT,()=>console.log(`Notification service is running in port ${PORT}`));
