const mongoose=require("mongoose");


const connectDB= async()=>{
    try{
        const MONGO_URI=process.env.MONGO_URI
        await mongoose.connect(MONGO_URI);
        console.log("mongo connected")
    }   
    catch(err){
        console.log("mongo not connected")
        throw err
    }
}

module.exports=connectDB