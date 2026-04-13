const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "Name is Required"],
    minlength: 5,
  },
  email:{
    type:"String",
    required:[true,"Email is mandatory"],
    unique:true,
    match:[/^\S+@\S+\.\S+$/,"Enter valid email"]
  },
  address: {
    type: "String",
    required: true,
  },
  ContactNo: {
    type: "Number",
    required: true,
  },
  
  password:{
    type:"String",
     required: [true, "Password is Required"],
    minlength: 8,
  }
},
{
    timestamps:true
}
);
module.exports=mongoose.model("user",userschema);
// module.exports=mongoose.model("userdet",userschema);
