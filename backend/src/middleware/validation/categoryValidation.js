const {body , validationResult}= require("express-validator");
const ApiError = require("../../utils/ApiErrors");

const createCategoryValidation=[
    body("name").trim().notEmpty().withMessage("Category name is required").bail().isLength({min:2,max:50}).withMessage("invalid size"),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return next(new ApiError(400,"validation failed",errors.array()))
        }
        next()
    }
]

const updateCategoryValidation=[
    body("name").optional().trim().isLength({min:2,max:50}).withMessage("invalid size"),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return next(new ApiError(400,"validation failed",errors.array()))
        }
        next()
    }
]

module.exports={updateCategoryValidation,createCategoryValidation}