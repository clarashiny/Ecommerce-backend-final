const jwt=require('jsonwebtoken');
require('dotenv').config();
const user=require("../models/user")
const protect=async(req,res,next)=>{
    const token=req.header('Authorization')?.split(" ")[1];
    if(!token){
        return res.status(403).json({message:"access denied"});

    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            res.status(403).json({message:"Invalid or expired token"});
        }
        req.users=user.id;
        console.log(user);
        next();
    })
}
module.exports={protect};