import express from 'express'
import cors from 'cors'
import connectDB from './DB/db.js';
const app= express();
import router from './route/uesrRoute.js';
app.use(express.json());
app.use(cors());
// app.get('/',(req,res)=>{
//     res.send("hello world");
// })
app.use('/api',router)
app.listen(3000,()=>{
    console.log('server is running on port 3000');
    connectDB();
})