const express=require("express")
const cartController=require("../controllers/cartController")
const authMiddleware=require("../middleware/auth/authMiddleware")
const validateAllowedFields=require("../middleware/validation/validateAllowedField")
const {addToCartValidation,updateCartValidation}=require("../middleware/validation/cartValidation")
const {mongoIdValidation}=require("../middleware/validation/commonValidation")
const validate=require("../middleware/validation/validate")
const router=express.Router()

router.post("/",
    authMiddleware,
    validateAllowedFields([
        "productId",
        "quantity"
    ]),
    addToCartValidation,
    validate,
    cartController.addToCart
)

router.get("/",
    authMiddleware,
    cartController.getMyCart
)

router.patch("/:id",
    authMiddleware,
    mongoIdValidation("id"),
    validateAllowedFields([
        "quantity"
    ]),
    updateCartValidation,
    validate,
    cartController.updateCartItem
)

router.delete("/:id",
    authMiddleware,
    mongoIdValidation("id"),
    validate,
    cartController.removeCartItem
)

module.exports=router