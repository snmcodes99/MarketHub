const {body}=require("express-validator")

const createAddressValidation=[
    body("name")
        .trim()
        .notEmpty().withMessage("Full name is required")
        .bail()
        .isLength({max:50}).withMessage("Full name cannot exceed 50 characters"),
    body("phoneNo")
        .trim()
        .notEmpty().withMessage("Phone number is required")
        .bail()
        .isMobilePhone().withMessage("Invalid phone number"),
    body("houseNo")
        .trim()
        .notEmpty().withMessage("House number is required"),
    body("street")
        .trim()
        .notEmpty().withMessage("Street is required"),
    body("city")
        .trim()
        .notEmpty().withMessage("City is required"),
    body("state")
        .trim()
        .notEmpty().withMessage("State is required"),
    body("country")
        .trim()
        .optional()
        .isLength({max:50}).withMessage("Country cannot exceed 50 characters"),
    body("zipCode")
        .trim()
        .notEmpty().withMessage("Postal code is required"),
    body("addressType")
        .optional()
        .isIn(["HOME","OFFICE","OTHER"])
        .withMessage("Invalid address type"),
    body("isDefault")
        .optional()
        .isBoolean()
        .withMessage("isDefault must be boolean")
]
const updateAddressValidation=[
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty"),
    body("phoneNo")
        .optional()
        .trim()
        .isMobilePhone()
        .withMessage("Invalid phone number"),
    body("houseNo")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("House number cannot be empty"),
    body("street")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Street cannot be empty"),
    body("city")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("City cannot be empty"),
    body("state")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("State cannot be empty"),
    body("country")
        .optional()
        .trim(),
    body("zipCode")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Zip code cannot be empty"),
    body("addressType")
        .optional()
        .isIn(["HOME","OFFICE","OTHER"])
        .withMessage("Invalid address type"),
    body("isDefault")
        .optional()
        .isBoolean()
        .withMessage("isDefault must be boolean")
]
module.exports={
    createAddressValidation,
    updateAddressValidation
}