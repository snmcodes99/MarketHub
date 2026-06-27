const jwt=require("jsonwebtoken")
const ApiError=require("../../utils/ApiErrors")
const UserModel = require("../../models/User")
const authMiddleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader){
        return next(new ApiError(401,"unauthorize"))
    }
    if(!authHeader.startsWith("Bearer ")){
        return next(new ApiError(401,"unauthorize"))
    }
    const token=authHeader.split(" ")[1];
    let id
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        id=decode.id;
    }
    catch(err){
        return next(new ApiError(401,"unauthorize"))
    }
    const user=await UserModel.findById(id)
    if(!user){
        return next(new ApiError(401,"unauthorize"))
    }
    req.user=user
    next()
}

module.exports=authMiddleware