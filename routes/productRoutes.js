const express=require("express")
const productrouter=express.Router();
const {createproduct,getproduct,updateproduct,deleteproduct,categoryproduct,productname,productcategory}=require("../controllers/generation/productController");
const {protect}=require("../middleware/authMiddleware")

productrouter.post("/createproduct",protect,createproduct);
productrouter.get("/getproduct",protect,getproduct);
productrouter.put("/updateproduct/:id",protect,updateproduct);
productrouter.delete("/deleteproduct/:id",protect,deleteproduct);
productrouter.post("/categoryproduct",protect,categoryproduct);
productrouter.post("/productname",protect,productname);
productrouter.post("/productcategory",protect,productcategory);


module.exports=productrouter;