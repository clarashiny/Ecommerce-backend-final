const express=require("express");
const router=express.Router();
const {getuser,updateuser,deleteuser}=require("../controllers/generation/userProfile")
const {protect}=require("../middleware/authMiddleware")
router.get("/getuser",protect,getuser);
router.put("/updateuser/:id",protect,updateuser);
router.delete("/deleteuser/:id",protect,deleteuser);
module.exports=router;