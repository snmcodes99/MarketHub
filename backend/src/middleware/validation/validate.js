const {validationResult}=require("express-validator")
const ApiError = require("../../utils/ApiErrors")

const validate=(req,res,next)=>{
    const errors=validationResult(req);
        if(!errors.isEmpty()){
            return next(new ApiError(400,"validation failed",errors.array()));
        }
    next()
}

module.exports=validate