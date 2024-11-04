import express from 'express';
import mongoose from 'mongoose';
import usedCarRoutes from './routes/userRoutes';
import cors from 'cors';
const app =express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://autohub024:AutoHub@cluster0.qi4lt.mongodb.net/userdb?retryWrites=true&w=majority')
.then(()=>console.log('Connected to mongoDb'))
.catch((error)=>console.log('not connected to mongoDb'));


app.use('/api',usedCarRoutes);

const PORT=process.env.PORT || 3003;

app.listen(PORT,()=>console.log(`User details  service is running in port ${PORT}`));
