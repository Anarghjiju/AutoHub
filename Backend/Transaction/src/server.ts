import app from './app'

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Transaction service is running in port ${PORT}`);
});