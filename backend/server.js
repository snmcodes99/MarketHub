const dotenv=require("dotenv");
const connectDB=require("./src/config/db")
const boot=require("./src/config/boot")

const app=require("./src/app");
dotenv.config();

const PORT=(process.env.PORT)?process.env.PORT:3000;


const startServer=async ()=>{
    try{
        await connectDB()
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
    try{
        await boot()
    }catch(err){
        console.log(err)
        process.exit(1)
    }
    app.listen(PORT,()=>{
        console.log(`server listioing at port ${PORT}`)
    })
}

startServer()