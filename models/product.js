const mongoose = require("mongoose");

const productschema=mongoose.Schema({
    productName:{
        type:"String",
        required:[true,"please enter the product name"]
            },
     category:{
        type:"String",
        required:[true,"enter category type"]

     },
     price:{
        type:"Number",
        required:[true,"please enter the price amount"],
     }  ,     
});
module.exports=mongoose.model("product",productschema)