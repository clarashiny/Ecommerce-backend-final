const express=require("express")
const router=express.Router();
const{register,login,getuser}=require("../controllers/tracking/authentication")
const {protect}=require("../middleware/authMiddleware")
router.post("/register",register);
router.post("/login",login);
router.get("/getuser",protect,getuser)
module.exports=router