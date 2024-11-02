import express from 'express';
import carDetailsRoutes from './routes/carDetailsRoutes';
const cors = require('cors');
import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://autohub024:AutoHub@cluster0.qi4lt.mongodb.net/cardetails?retryWrites=true&w=majority')
.then(()=>console.log('Connected to mongoDb'))
.catch((error)=>console.log('not connected to mongoDb'));


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cars',carDetailsRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT,()=>{
    console.log(`Car Details service running on port ${PORT}`);
});