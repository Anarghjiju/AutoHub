import express from 'express';
import mongoose from 'mongoose';
import usedCarRoutes from './routes/usedCarRoutes';

const app =express();
app.use(express.json());

mongoose.connect('mongodb+srv://autohub024:AutoHub@cluster0.qi4lt.mongodb.net/usedcardb?retryWrites=true&w=majority')
.then(()=>console.log('Connected to mongoDb'))
.catch((error)=>console.log('not connected to mongoDb'));


app.use('/api',usedCarRoutes);

const PORT=process.env.PORT || 3001;

app.listen(PORT,()=>console.log(`used car service is running in port ${PORT}`));
