const express=require("express");
const authController=require("../controllers/authController");
const validateAllowedFields = require("../middleware/validateAllowedField");
const { registerValidation,  loginValidation } = require("../middleware/authValidation");
const router=express.Router();

router.post("/register",validateAllowedFields(["name","email","password"]),registerValidation,authController.register);
router.post("/login",validateAllowedFields(["email","password"]),loginValidation,authController.login);
router.post("/logout",authController.logout);
router.post("/forgot-password",authController.forgotPassword);
router.patch("/reset-password",authController.resetPassword);

module.exports=router