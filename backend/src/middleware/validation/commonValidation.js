const {param}=require("express-validator")
const mongoIdValidation=(id)=>{
    return [
        param(id).isMongoId().withMessage(`Invalid ${id}`)
    ]
}

module.exports={
    mongoIdValidation
}