const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Joi = require("joi");

// Define Joi validation schemas for base user fields and each role
const baseUserValidationSchema = Joi.object({
  username: Joi.string().min(2).max(15).required().messages({
    "string.min": "Username must be at least 2 characters long.👤",
    "string.max": "Username must be at most 15 characters long. 👤",
    "any.required": "Username is a required field. 👤",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address. 📧",
    "any.required": "Email is a required field. 📧",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long. ❌❗",
    "any.required": "Password is a required field.❌❗",
  }),
  passwordConfirm: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.❌❗",
    "any.required": "Password confirmation is a required field.❌❗",
  }),
  role: Joi.string()
    .valid(
      "Admin",
      "Tourist",
      "Tour_Guide",
      "Advertiser",
      "Seller",
      "Tourism_Governer"
    )
    .required()
    .messages({
      "any.only": "Role must be one of the following: Admin, Tourist, Tour Guide, Advertiser, Seller, Tourism Governer. 👤",
      "any.required": "Role is a required field. 👤",
    }),
});

const roleSchemas = {
  Admin: Joi.object({}),
  Tourist: Joi.object({
    mobile_number: Joi.string().required().messages({
      "any.required": "Mobile number is a required field for Tourist role.📱",
    }),
    nationality: Joi.string().required().messages({
      "any.required": "Nationality is a required field for Tourist role.👤",
    }),
    DOB: Joi.date().required().messages({
      "date.base": "Please provide a valid date of birth. 🎂",
      "any.required": "Date of birth (DOB) is a required field for Tourist role.🎂",
    }),
    job: Joi.string().required().messages({
      "any.required": "Job is a required field for Tourist role.🫡",
    }),
  }),
  Tour_Guide: Joi.object({
    years_of_experience: Joi.number().required().messages({
      "number.base": "Years of experience must be a number. 🔢",
      "any.required": "Years of experience is a required field for Tour Guide role.🔢",
    }),
    experience: Joi.array().items(Joi.string()).required().messages({
      "array.base": "Experience must be an array of strings.🫡",
      "any.required": "Experience is a required field for Tour Guide role.🫡",
    }),
  }),
  Advertiser: Joi.object({
    website_link: Joi.string().uri().required().messages({
      "string.uri": "Please provide a valid URL for the website link. 🔗",
      "any.required": "Website link is a required field for Advertiser role.🔗",
    }),
    hotline: Joi.number().required().messages({
      "number.base": "Hotline must be a valid number. 🔢",
      "any.required": "Hotline is a required field for Advertiser role.🔢",
    }),
    activities: Joi.array().items(Joi.string()).optional().messages({
      "array.base": "Activities must be an array of strings.🤸🏼‍♂️",
    }),
    about: Joi.string().required().messages({
      "any.required": "About is a required field for Advertiser role.🧾",
    }),
  }),
  Seller: Joi.object({
    sellerName: Joi.string().required().messages({
      "any.required": "Seller name is a required field for Seller role.👤",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is a required field for Seller role.🧾",
    }),
  }),
  Tourism_Governer: Joi.object({}),
};

// Middleware to validate user based on role
exports.validateUser = catchAsync(async (req, res, next) => {
  // Validate base fields first
  const { role } = req.body;
  const roleSchema = roleSchemas[role];

  if (!roleSchema) {
    return next(new AppError("Invalid role provided", 422));
  }

  // Merge base schema with role-specific schema
  const combinedSchema = baseUserValidationSchema.concat(roleSchema);

  // Validate the entire request body using the combined schema
  const { error } = combinedSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return next(
      new AppError(
        error.details.map((detail) => detail.message).join(", "),
        422
      )
    );
  }

  next();
});
