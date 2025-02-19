import mongoose from "mongoose";

const todomodel= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, ref: 'User',required:true
    },
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:false
    }
})
const Todo = mongoose.model('Todo',todomodel)

export default Todo;
