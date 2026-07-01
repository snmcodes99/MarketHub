const {body}=require("express-validator");

const createSellerRequestValidation=[
    body("shopName")
        .trim()
        .notEmpty().withMessage("Shop name is required")
        .bail()
        .isLength({max:100}).withMessage("Shop name cannot exceed 100 characters"),
    body("businessDescription")
        .trim()
        .notEmpty().withMessage("Business description is required")
        .bail()
        .isLength({max:500}).withMessage("Business description cannot exceed 500 characters"),

    body("businessAddress.street")
        .trim()
        .notEmpty().withMessage("Street is required"),

    body("businessAddress.city")
        .trim()
        .notEmpty().withMessage("City is required"),

    body("businessAddress.state")
        .trim()
        .notEmpty().withMessage("State is required"),

    body("businessAddress.postalCode")
        .trim()
        .notEmpty().withMessage("Postal code is required"),

    body("businessAddress.country")
        .optional()
        .trim(),

    body("documents.gst")
        .trim()
        .notEmpty().withMessage("GST document is required"),

    body("documents.pan")
        .trim()
        .notEmpty().withMessage("PAN document is required"),

    body("documents.identityProof")
        .trim()
        .notEmpty().withMessage("Identity proof is required"),
]

const rejectSellerRequestValidation=[
    body("rejectionReason")
        .trim()
        .notEmpty()
        .withMessage("Rejection reason is required")
        .isLength({max:300})
        .withMessage("Rejection reason cannot exceed 300 characters")
]

module.exports={
    createSellerRequestValidation,
    rejectSellerRequestValidation
}