import jwt from 'jsonwebtoken'
const middleware=(req,res,next)=>{
    try{
        const token = req.header('x-token')
        if(!token){
            return res.status(400).json({message:"token required"})
        }
        let decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user =decode.user;
        next();
        
    }
    catch(err){
        return res.status(500).json({message:"server error"})
    }
}

export default middleware