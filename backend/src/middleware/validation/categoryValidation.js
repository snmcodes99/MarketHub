const {body , validationResult}= require("express-validator");

const createCategoryValidation=[
    body("name").trim().notEmpty().withMessage("Category name is required").bail().isLength({min:2,max:50}).withMessage("invalid size"),
]

const updateCategoryValidation=[
    body("name").optional().trim().isLength({min:2,max:50}).withMessage("invalid size"),
]

module.exports={updateCategoryValidation,createCategoryValidation}