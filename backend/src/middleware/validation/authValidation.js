const {body}=require("express-validator")
const registerValidation=[
    body("name").trim().notEmpty().withMessage("Name is Required").bail().isLength({max:50}).withMessage("Name can not exceed 50 letters"),
    body("email").trim().notEmpty().withMessage("email is requried").bail().isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required").bail().isLength({min:6}).withMessage("password must be at least 6 character"),
]

const loginValidation=[
    body("email").trim().notEmpty().withMessage("email is requried").bail().isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required").bail().isLength({min:6}).withMessage("password must be at least 6 character"),
]

module.exports={
    registerValidation,
    loginValidation
}