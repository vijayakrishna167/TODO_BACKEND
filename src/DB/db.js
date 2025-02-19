import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connectDB=()=>{
    try{
        mongoose.connect(process.env.MONGO_URI).then(console.log("db connected"))
    }
    catch(err){
        console.log(err);
    }
}
export default connectDB;