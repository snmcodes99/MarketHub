const {body}=require("express-validator")
const { isNumeric } = require("validator")
const addToCartValidation=[
    body("productId")
        .notEmpty()
        .withMessage("Product id is required")
        .isMongoId()
        .withMessage("Invalid product id"),
    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isNumeric()
        .isInt({min:1})
        .withMessage("Quantity must be at least 1")
        .toInt()
    ]
    
    const updateCartValidation=[
        body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isNumeric()
        .isInt({min:1})
        .withMessage("Quantity must be at least 1")
        .toInt()
]

module.exports={
    addToCartValidation,
    updateCartValidation
}