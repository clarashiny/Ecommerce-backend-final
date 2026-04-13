const express=require("express");
const connectDB = require("./config/dbConnection");
const userroute=require("./routes/authenticationRoutes")
const userprofile=require("./routes/userProfileRoutes")
const productroute=require("./routes/productRoutes")
const orderRoute=require("./routes/orderRoutes")
const cors=require("cors")

const app=express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
port=process.env.PORT;
connectDB();

app.use("/ecomusers",userroute)
app.use("/ecomprofile",userprofile)
app.use("/products",productroute)
app.use("/orders",orderRoute)


// app.use('/',authentication)
app.listen(port,()=>console.log("server is running in ",port));
