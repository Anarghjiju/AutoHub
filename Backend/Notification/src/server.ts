import express from 'express';
import mongoose from 'mongoose';
import notificationRoutes from './routes/notificationRoutes';
const cors = require('cors');


const app =express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://autohub024:AutoHub@cluster0.qi4lt.mongodb.net/notificationdb?retryWrites=true&w=majority')
.then(()=>console.log('Connected to mongoDb'))
.catch((error)=>console.log('not connected to mongoDb'));


app.use('/api',notificationRoutes);

const PORT=process.env.PORT || 3002;

app.listen(PORT,()=>console.log(`Notification service is running in port ${PORT}`));
