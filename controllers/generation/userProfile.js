const asynchandler=require("express-async-handler")
const userdet=require("../../models/user")


//getuser
const getuser=async(req,res)=>{
    const result=await userdet.find();
    res.status(200).json({result})
}

const updateuser=asynchandler(async(req,res)=>{
    const user=await userdet.findById(req.params.id)
    if(!user){
        res.status(400);
        throw new Error("user not found");

    }
    const update=await userdet.findByIdAndUpdate(req.params.id,req.body,{new:true, });
    res.status(200).send(update);

});

const deleteuser=asynchandler(async(req,res)=>{
    const user=await userdet.findById(req.params.id)
    if(!user){
        res.status(400);
        throw new Error("User not found")
    }
await userdet.deleteOne({_id:req.params.id});
res.status(200).send({deletedid:req.params.id,
                       
});
}
)





module.exports={getuser,updateuser,deleteuser}