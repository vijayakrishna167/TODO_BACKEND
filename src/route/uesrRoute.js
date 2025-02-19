import express from "express"
import { loginuser, UserReg } from "../controller/userController.js"
import middleware from "../middleware/usermiddle.js";
import User from "../model/usermodel.js";
import Todo from "../model/todomodel.js";
import { addtodo, deleteTodo, gettodo, updateTodo } from "../controller/todocontroller.js";
const router = express.Router();

router.post('/register',UserReg);
router.post('/login',loginuser);
router.get('/dash',middleware, async(req,res)=>{
    try {
        let exist = await User.findById(req.user.id);
        if(!exist){
            return res.status(400).send('user not found')
        }
        res.json(exist);

    }
    catch(err){
        res.status(500).json({message:"middleware server error"})
        console.log(err);
    }
})
router.post('/addtodo',middleware,addtodo);
router.get('/gettodo',middleware,gettodo);
router.put('/update/:id',middleware,updateTodo);
router.delete('/delete/:id',middleware,deleteTodo);

export default router