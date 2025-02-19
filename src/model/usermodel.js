import mongoose from "mongoose";

const usermodel=
    mongoose.Schema({
        name:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
    })

const User = new mongoose.model('User',usermodel);
export default User;