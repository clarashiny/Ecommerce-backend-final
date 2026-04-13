const mongoose=require("mongoose");
require ("dotenv").config();
const asynchandler=require("express-async-handler")
const connectDB=asynchandler( async()=>{
    try{
        await mongoose.connect(process.env.MONGOURL)
        console.log("DB connected");
        
    }
    catch(e){
              console.log(e);
              
    }
})
module.exports=connectDB;
