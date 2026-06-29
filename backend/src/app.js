const express=require("express");
const authRoutes=require("./routes/authRoutes")
const errorMiddleware=require("./middleware/error/errorMiddleware")
const categoryRoutes=require("./routes/categoryRoutes");
const productRoutes=require("./routes/productRoutes")
const app=express();
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"hello from app"
    })
})

app.use("/api/auth",authRoutes);
app.use("/api/category",categoryRoutes)
app.use("/api/product",productRoutes)


app.use(errorMiddleware)
module.exports=app