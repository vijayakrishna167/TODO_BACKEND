import User from "../model/usermodel.js";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();
export const UserReg=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const exist = await User.findOne({email});
        if(exist){
            return res.json({message:'user already exists'});
        }
        const hashedpass = await bcrypt.hash(password,10);
        let newUser = new User({
            name,
            email,
            password:hashedpass
        })
        await newUser.save();
        return res.status(201).json({message:'user registered successfuly'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'servererror'});
    }
}
export const loginuser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:'all fields are required'});
        }
        const users = await User.findOne({email})
        if(!users){
            return res.status(400).json({message:"invalis email address"})
        }
        const isMatch = await bcrypt.compare(password,users.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid crediantials"})
        }
        let payload={
            user:{
                id:users.id
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1hr'},(err,token)=>{
            if(err) throw err;
            return res.status(201).json({message:"login successfulll",token})
        })
    }
    catch(err){
        return res.status(500).json({message:"server error"})
    }
}