const express=require("express");
const authController=require("../controllers/authController");
const validateAllowedFields=require("../middleware/validation/validateAllowedField");
const { registerValidation,  loginValidation }=require("../middleware/validation/authValidation");
const validate = require("../middleware/validation/validate");
const router=express.Router();

router.post("/register",
    validateAllowedFields(["name","email","password"]),
    registerValidation,
    validate,
    authController.register
);
router.post("/login",
    validateAllowedFields(["email","password"]),
    loginValidation,
    validate,
    authController.login
);
router.post("/logout",authController.logout);
router.post("/forgot-password",authController.forgotPassword);
router.patch("/reset-password",authController.resetPassword);

module.exports=router