const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4: uuidv4 } = require("uuid");

const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/User");

const multerStorage = multer.memoryStorage();

// Multer filter to validate images for image fields and PDFs for document fields
const multerFilter = (req, file, cb) => {
  // Check for image files in 'id' or 'photo' fields
  if (
    (file.fieldname === "id" ||
      file.fieldname === "photo" ||
      file.fieldname === "mainImage" ||
      file.fieldname === "images") &&
    file.mimetype.startsWith("image")
  ) {
    cb(null, true);
  }
  // Check for PDF files in 'certificates' or 'taxationRegistryCard' fields
  else if (
    (file.fieldname === "certificates" ||
      file.fieldname === "taxationRegistryCard") &&
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Invalid file type for ${file.fieldname}. Only images are allowed for ID or photo, and PDFs are required for certificates or taxation registry card.📷`,
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const uniqueImageId = uuidv4();
  let folder = "users";

  // Save the filename based on role
  if (req.user.role === "Tour_Guide") {
    req.file.filename = `tour-guide-${req.user.id}-${uniqueImageId}.jpeg`;
  } else if (req.user.role === "Advertiser" || req.user.role === "Seller") {
    req.file.filename = `logo-${req.user.id}-${uniqueImageId}.jpeg`;
    folder = "logos"; // Use 'logos' folder for Advertiser and Seller
  } else {
    req.file.filename = `user-${req.user.id}-${uniqueImageId}.jpeg`; // Default for other users
  }

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${folder}/${req.file.filename}`);

  next();
});

// A helper function to filter fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.uploadImages = catchAsync(async (req, res, next) => {
  // Filter out unwanted fields that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename; // or logo

  // Update the user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Upload multiple files for Guest
exports.uploadGuestDocuments = upload.fields([
  { name: "id", maxCount: 1 }, // ID is mandatory for all roles
  { name: "certificates", maxCount: 5 }, // Tour Guide certificates
  { name: "taxationRegistryCard", maxCount: 1 }, // Advertiser/Seller
]);

// Process and save the documents based on role
const fs = require("fs").promises;
const path = require("path");

exports.processGuestDocuments = catchAsync(async (req, res, next) => {
  if (!req.files) {
    return next(new AppError("No files uploaded!", 400));
  }

  const uniqueImageId = uuidv4();
  const folder = "documents";

  // Helper function to process image
  const processImage = async (file, filename) => {
    try {
      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/${folder}/${filename}`);
    } catch (error) {
      if (
        error.message.includes("Input buffer contains unsupported image format")
      ) {
        // If it's not a supported image format, save the original file
        await fs.writeFile(
          path.join("public", "img", folder, filename),
          file.buffer
        );
      } else {
        throw error; // Re-throw if it's a different error
      }
    }
  };

  // Handle ID (required for all roles)
  if (req.files.id) {
    const idFile = req.files.id[0];
    idFile.filename = `id-${req.user.id}-${uniqueImageId}.jpeg`;
    await processImage(idFile, idFile.filename);
  }

  // Handle certificates (for Tour Guides)
  if (req.user.role === "Tour_Guide" && req.files.certificates) {
    for (const [index, file] of req.files.certificates.entries()) {
      file.filename = `certificate-${req.user.id}-${
        index + 1
      }-${uniqueImageId}.pdf`;
      await fs.writeFile(
        path.join("public", "img", folder, file.filename),
        file.buffer
      );
    }
  }

  // Handle taxation registry card (for Advertisers/Sellers)
  if (
    (req.user.role === "Advertiser" || req.user.role === "Seller") &&
    req.files.taxationRegistryCard
  ) {
    const taxFile = req.files.taxationRegistryCard[0];
    taxFile.filename = `taxation-${req.user.id}-${uniqueImageId}.pdf`;
    await fs.writeFile(
      path.join("public", "img", folder, taxFile.filename),
      taxFile.buffer
    );
  }

  next();
});

// Controller to update user with uploaded documents
exports.uploadGuestDocs = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email"); // Optional fields

  // Add file paths to the filteredBody if documents are uploaded
  if (req.files.id) filteredBody.idDocument = req.files.id[0].filename;
  if (req.files.certificates)
    filteredBody.certificates = req.files.certificates.map(
      (file) => file.filename
    );
  if (req.files.taxationRegistryCard)
    filteredBody.taxationRegistryCard =
      req.files.taxationRegistryCard[0].filename;

  // Set documentApprovalStatus to 'Pending'
  filteredBody.documentApprovalStatus = "Pending";

  // Update the user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Update multer to allow multiple file uploads for product images
exports.uploadProductImages = upload.fields([
  { name: "mainImage", maxCount: 1 }, // One main image
  { name: "images", maxCount: 5 }, // Up to 5 additional images
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
    const uniqueImageId = uuidv4();
    const folder = "products";
  
    // Process main image if it exists
    if (req.files && req.files.mainImage) {
      req.body.mainImage = `product-${req.params.id}-main-${uniqueImageId}.jpeg`;
      await sharp(req.files.mainImage[0].buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/${folder}/${req.body.mainImage}`);
    }
  
    // Process additional images if they exist
    if (req.files && req.files.images) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (file, index) => {
          const filename = `product-${req.params.id}-${uniqueImageId}-${index + 1}.jpeg`;
          await sharp(file.buffer)
            .resize(500, 500)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/img/${folder}/${filename}`);
  
          req.body.images.push(filename);
        })
      );
    }
  
    // Proceed to the next middleware even if no images were uploaded
    next();
  });
  