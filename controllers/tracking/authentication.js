const user=require("../../models/user")
const asynchandler=require("express-async-handler")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const bcrypt=require("bcryptjs")
//register
const register=asynchandler(async(req,res)=>{
    const{name,email,address,ContactNo,password}=req.body;
    if(!name || !email || !address || !ContactNo || !password){
        res.status(400);
        throw new Error("please fill all the fields");

    }
    //user already existed
    const userexists=await user.findOne({email:email});
    if(userexists){
        res.status(400);
        throw new Error('user already exists')
    }
    //pasword hashing 
    const saltconfig=parseInt(process.env.SALT);
    salt=await bcrypt.genSalt(saltconfig);
    console.log(salt);

    const hashedpassword=await bcrypt.hash(password,salt)
    console.log(password);
    console.log(hashedpassword);

    //save
    const userdet=await user.create({
        name:name,
        email:email,
        address:address,
        ContactNo:ContactNo,
        password:hashedpassword,
    })
    if(userdet){
        res.status(200).json({
            _id:userdet.id,
            name:userdet.name,
            email:userdet.email,
             address:userdet.address,
             ContactNo:userdet.ContactNo,
        })
    }
    
})

//login
const login=asynchandler(async(req,res)=>{
    const{email,password}=req.body;
    const userexists=await user.findOne({email:email});
    console.log(userexists);
    if(userexists && (await bcrypt.compare(password,userexists.password)))
    {
        res.status(200).json({
            _id:userexists._id,
            name:userexists.name,
            email:userexists.email,
            password:userexists.password,
            token:generatetoken(userexists._id)

        })
    }else{
        res.status(400);
        throw new Error("invalid email or password")
    }
    
});
const generatetoken=(id)=>{
    const token =jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"});
    console.log(token);
    return token;
    
}
//getuser
const getuser=async(req,res)=>{
    const resul=await user.find();
    res.status(200).json({resul})
}
module.exports={register,login,getuser};