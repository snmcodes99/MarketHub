const express = require("express");

const authMiddleware=require("../middleware/auth/authMiddleware");
const authorize=require("../middleware/auth/authorize");

const validateAllowedField=require("../middleware/validation/validateAllowedField");
const validate=require("../middleware/validation/validate");

const productController=require("../controllers/productController");

const {productIdValidation, createProductValidation, updateProductValidation } = require("../middleware/validation/productValidation");

const router=express.Router();

router.get("/",productController.getAllProducts)
router.get("/:id",productIdValidation,validate,productController.getProductByid)

router.post("/",
    authMiddleware,
    authorize("SELLER","ADMIN"),
    validateAllowedField([
        "name",
        "description",
        "brand",
        "category",
        "mrp",
        "sellingPrice",
        "stock",
        "images",
    ]),
    createProductValidation,
    validate,
    productController.createProduct
);

router.patch("/:id",
    authMiddleware,
    authorize("SELLER", "ADMIN"),
    validateAllowedField([
        "name",
        "description",
        "brand",
        "category",
        "mrp",
        "sellingPrice",
        "stock",
        "images",
    ]),
    productIdValidation,
    updateProductValidation,
    validate,
    productController.updateProduct
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("SELLER", "ADMIN"),
    productIdValidation,
    validate,
    productController.deleteProduct
);

module.exports=router