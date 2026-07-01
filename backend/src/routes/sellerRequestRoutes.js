const express = require("express");

const authMiddleware=require("../middleware/auth/authMiddleware");
const authorize=require("../middleware/auth/authorize");

const validateAllowedField=require("../middleware/validation/validateAllowedField");
const validate=require("../middleware/validation/validate");

const sellerRequestController=require("../controllers/sellerReqController");

const { createSellerRequestValidation, rejectSellerRequestValidation } = require("../middleware/validation/sellerRequestValidation");
const { mongo } = require("mongoose");
const { mongoIdValidation } = require("../middleware/validation/commonValidation");

const router=express.Router();

router.post("/",
    authMiddleware,
    authorize("CUSTOMER"),
    validateAllowedField([
        "shopName",
        "businessDescription",
        "businessAddress",
        "documents"
    ]),
    createSellerRequestValidation,
    validate,
    sellerRequestController.createSellerRequest
)

router.get("/",
    authMiddleware,
    authorize("ADMIN"),
    sellerRequestController.getAllSellerRequests
);

router.get("/me",
    authMiddleware,
    authorize("CUSTOMER"),
    sellerRequestController.getMySellerRequest
)

router.patch("/:id/approve",
    authMiddleware,
    authorize("ADMIN"),
    mongoIdValidation("id"),
    validate,
    sellerRequestController.approveSellerRequest
)

router.patch("/:id/reject",
    authMiddleware,
    authorize("ADMIN"),
    mongoIdValidation("id"),
    validateAllowedField([
        "rejectionReason"
    ]),
    rejectSellerRequestValidation,
    validate,
    sellerRequestController.rejectSellerRequest
)
module.exports=router