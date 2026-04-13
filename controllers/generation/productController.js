const asynchandler=require("express-async-handler");
const product=require("../../models/product")
//create product
const createproduct=asynchandler(async(req,res)=>{
    const{productName,category,price}=req.body;
    const saveproduct=await product.create({
        productName,category,price,

    })
    res.status(200).send(saveproduct)
});
 
//get product

const getproduct=asynchandler(async(req,res)=>{
    let result=await product.find();
    res.status(200).json({result});

});

//update product details
const updateproduct=asynchandler(async(req,res)=>{
    const foundproduct=await product.findById(req.params.id);
    if(!foundproduct){
        res.status(400);
        throw new Error("product not found")
    }
    const update=await product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).send(update);
    });

//delete product
const deleteproduct=asynchandler(async(req,res)=>{
    const foundproduct=await product.findById(req.params.id);
    if(!foundproduct){
        res.status(400);
        throw newError("product not found")
    }
    const deleteone=await product.deleteOne({_id:req.params.id});
    // res.status(200).send(deleteone)
     res.status(200).send({deletedid:req.params.id})
})

//category filter with price in ascending
const categoryproduct=asynchandler(async(req,res)=>{
    
    const categoryfilter=await product.aggregate([
  {
    $group:
            
      {
        _id: "$category",
        count: {
          $sum: 1
        },
        products: { $push: "$$ROOT" },
        
      
      },
  }
])
res.status(200).send(categoryfilter);
})

//filter based on productname
const productname=asynchandler(async(req,res)=>{
    
    const productfilter=await product.aggregate([
  {
    $group:
      /**
       * _id: The id of the group.
       * fieldN: The first field name.
       */
      {
        _id: "$productName",
        details: {
          $sum: 1
        },
        products: {
          $push: "$$ROOT"
        }
      }
  }
])
res.status(200).send(productfilter);
})


const productcategory=asynchandler(async(req,res)=>{
     const filter = {};
    const { productName,category,price } = req.body; 
  if (productName) {
    filter.productName = productName;
  }
  if (category) {
    filter.category = category;
  }
  if (price) {
    filter.price= price;
  }
   try {
    // Pass the dynamic filter object to the find method
    const prodfilter = await product.find(filter);
    res.status(200).json(prodfilter );
  } catch (error) {
    res.status(500).send(error.message);
  }
})
module.exports = {createproduct,getproduct,updateproduct,deleteproduct,categoryproduct,productname,productcategory};