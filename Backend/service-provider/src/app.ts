import express from 'express';
import providerRoutes from './route/providerRoutes';
const cors = require('cors');
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://autohub024:AutoHub@cluster0.qi4lt.mongodb.net/serviceproviderdb?retryWrites=true&w=majority")
.then(()=>console.log('Connected to mongoDb'))
.catch((error)=>console.log('not connected to mongoDb'));

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/providers', providerRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Service Provider service running on port ${PORT}`);
});
