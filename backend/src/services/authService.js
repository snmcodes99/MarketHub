const userModel=require("../models/User")
const bcrypt=require("bcrypt")
const ApiError = require("../utils/ApiErrors")
const jwt=require("jsonwebtoken")
const registerSerice=async(data)=>{
    const {name,email}=data
    const isUser=await userModel.findOne({email})
    if(isUser){
        throw new ApiError(409,"email already exists")
    }
    const hashedPassword=await bcrypt.hash(data.password,10)
    const userData={
        name,
        email,
        password:hashedPassword,
        role:"CUSTOMER",
    }
    const user = await userModel.create(userData)
    return user
}

const loginService=async(data)=>{
    const {email,password}=data;
    const user=await userModel.findOne({email}).select("+password")
    if(!user){
        throw new ApiError(401,"Invalid Credentials")
    }
    const hashedpassword=user.password
    const isMatch=await bcrypt.compare(password,hashedpassword)
    if(!isMatch){
        throw new ApiError(401,"Invalid Credentials")
    }
    const JWT_SECRET=process.env.JWT_SECRET
    const token=jwt.sign(
        {
            id:user._id
        },
        JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )
    return {
        user,
        token
    }
}

module.exports={registerSerice,loginService}