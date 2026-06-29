const express = require("express");

const categoryController=require("../controllers/categoryController");

const authMiddleware=require("../middleware/auth/authMiddleware");
const authorize=require("../middleware/auth/authorize");

const validateAllowedField=require("../middleware/validation/validateAllowedField");
const validate=require("../middleware/validation/validate")
const {createCategoryValidation,updateCategoryValidation,}=require("../middleware/validation/categoryValidation");

const router = express.Router();
router.get("/", categoryController.getAllCategories);

router.post(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  validateAllowedField(["name"]),
  createCategoryValidation,
  validate,
  categoryController.createCategory
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  validateAllowedField(["name"]),
  updateCategoryValidation,
  validate,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  categoryController.deleteCategory
);

module.exports = router;