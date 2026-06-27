const {body,validationResult}=require("express-validator")
const ApiError=require("../../utils/ApiErrors")
const registerValidation=[
    body("name").trim().notEmpty().withMessage("Name is Required").bail().isLength({max:50}).withMessage("Name can not exceed 50 letters"),
    body("email").trim().notEmpty().withMessage("email is requried").bail().isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required").bail().isLength({min:6}).withMessage("password must be at least 6 character"),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return next(new ApiError(400,"validation failed",errors.array()))
        }
        next()
    }
]

const loginValidation=[
    body("email").trim().notEmpty().withMessage("email is requried").bail().isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required").bail().isLength({min:6}).withMessage("password must be at least 6 character"),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return next(new ApiError(400,"validation failed",errors.array()))
        }
        next()
    }
]

module.exports={
    registerValidation,
    loginValidation
}