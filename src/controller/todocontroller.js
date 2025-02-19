import Todo from "../model/todomodel.js";
import jwt from 'jsonwebtoken'

export const addtodo=async(req,res)=>{
    try{
        const {title} = req.body;
        const newtodo =new Todo({
            userId:req.user.id,
            title
        })
        await newtodo.save();
        res.status(201).json({message:"new todo added",todo:newtodo})
    }
    catch(err){
        res.status(500).json({error:'server error'})
    }
}

export const gettodo =async (req,res)=>{
    try{
        const todos = await Todo.find({userId:req.user.id})
        res.status(201).json({message:todos})
    }
    catch(err){
        res.status(500).json({error:"server error"})
    }
}

export const updateTodo = async (req,res)=>{
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id,
            {completed:req.body.completed},
            {new:true}
        );
        res.json(todo);
    }
    catch(err){
        res.status(500).json({error:"server error"});
        console.log(err);
    }
}

export const deleteTodo = async (req,res)=>{
    try{
        const todo =await Todo.findByIdAndDelete(req.params.id);
        if(!todo){
            return res.status(404).json({message:"todo not found"})
        }
        res.json({message:"todo deleted"})
    }
    catch(err){
        res.status(500).json({error:"server error"});
        console.log(err);
    }
}