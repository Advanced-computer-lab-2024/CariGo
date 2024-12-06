const { Admin } = require("mongodb");
const userModel = require("../models/User");
const categoryModel = require("../models/Category");
const tagModel = require("../models/Tag");
const PromoCode = require("../models/PromoCode"); // Adjust the path as necessary
const Purchase = require("../models/Purchase");
const bookingModel = require("../models/Bookings");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");

const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const purchase = require("../models/Purchase");

const addAdmin = async (req, res) => {
  const { username, password, passwordConfirm, email, about } = req.body;

  try {
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const newAdmin = await userModel.create({
      username,
      email,
      password,
      passwordConfirm,
      about,
      role: "Admin",
    });

    res.status(201).json({ message: "Admin created successfully", newAdmin });
  } catch (error) {
    console.error("Error during user creation:", error); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.body;
  // console.log(req)
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userModel.deleteOne({ username });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addTourismGovernor = async (req, res) => {
  const { username, password, passwordConfirm, email, about } = req.body;

  try {
    console.log(req.body + "  governer"); // Log the incoming data

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Create the new tourism governor user
    const newGovernor = await userModel.create({
      username,
      email,
      password,
      passwordConfirm,
      about,
      role: "Tourism_Governer",
    });

    res
      .status(201)
      .json({ message: "Tourism Governor created successfully", newGovernor });
  } catch (error) {
    console.error("Error during tourism governor creation:", error); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await categoryModel.create({ name, description });
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createTag = async (req, res) => {
  const { title } = req.body;

  try {
    const existingTag = await tagModel.findOne({ title });
    if (existingTag) {
      return res.status(400).json({ message: "Preference Tag already exists" });
    }

    const tag = await tagModel.create({ title });
    res
      .status(201)
      .json({ message: "Preference Tag created successfully", tag });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await tagModel.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTag = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  //console.log(req.body)
  //  console.log(type+" update Tag "+id)
  try {
    const updatedTag = await tagModel.findByIdAndUpdate(
      id,
      { title },
      { new: true, runValidators: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ message: "Preference Tag not found" });
    }

    res
      .status(200)
      .json({ message: "Preference Tag updated successfully", updatedTag });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTag = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTag = await tagModel.findByIdAndDelete(id);

    if (!deletedTag) {
      return res.status(404).json({ message: "Preference Tag not found" });
    }

    res.status(200).json({ message: "Preference Tag deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  // const { id } = req.params;
  const { username } = req.body;
  //console.log(req.body)
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userModel.deleteOne({ username });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPendingDocuments = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1; // Default to page 1
  const limit = req.query.limit * 1 || 10; // Default to 10 documents per page
  const skip = (page - 1) * limit;
  const users = await User.find({
    role: { $in: ["Tour_Guide", "Advertiser", "Seller"] },
    documentApprovalStatus: "Pending",
  })
    .select("username role idDocument certificates taxationRegistryCard")
    .skip(skip)
    .limit(limit);
  if (!users.length) {
    return next(new AppError("No pending documents found.", 404));
  }
  const usersWithFiles = await Promise.all(
    users.map(async (user) => {
      const files = {}; // Helper function to check and read file content
      const readFile = async (filePath) => {
        try {
          const fullPath = path.join(
            __dirname,
            "public",
            "img",
            "documents",
            filePath
          );
          if (await fs.access(fullPath)) {
            return fs.readFile(fullPath);
          } else {
            console.error(`File not found: ${fullPath}`);
            return null;
          }
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
          return null;
        }
      }; // Read ID document
      if (user.idDocument) {
        files.idDocument = await readFile(user.idDocument);
      } // Read certificates
      if (user.certificates && user.certificates.length > 0) {
        files.certificates = await Promise.all(
          user.certificates.map((cert) => readFile(cert))
        );
      } // Read taxation registry card
      if (user.taxationRegistryCard) {
        files.taxationRegistryCard = await readFile(user.taxationRegistryCard);
      }
      return { ...user.toObject(), files };
    })
  );
  res.status(200).json({
    status: "success",
    results: usersWithFiles.length,
    data: { users: usersWithFiles },
  });
});

const approveDocument = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    {
      documentApprovalStatus: "Approved",
    },
    { new: true }
  );

  if (!user) {
    return next(new AppError("No user found with that ID 👤", 404));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const rejectDocument = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    {
      documentApprovalStatus: "Rejected",
    },
    { new: true }
  );

  if (!user) {
    return next(new AppError("No user found with that ID👤", 404));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const createPromoCode = async (req, res) => {
  const { code, discount, expirationDate } = req.body;

  try {
    // Check if the promo code already exists
    const existingPromo = await PromoCode.findOne({ code });
    if (existingPromo) {
      return res.status(400).json({ message: "Promo code already exists" });
    }

    // Create a new promo code
    const promoCode = await PromoCode.create({
      code,
      discount,
      expirationDate,
      isActive: true,
    });

    res
      .status(201)
      .json({ message: "Promo code created successfully", promoCode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const revenueReport = async (req, res) => {
  try {
    const { product, startDate, endDate, month } = req.query;
    let totalRevenue = 0;
    let totalBookings = 0;
    let totalProductRevenue = 0;
    let totalItineraryBookings = 0;
    let totalEventBookings = 0;
    let totalProductSales = 0;
    let itineraryRevenueM = Array(12).fill(0);
    let eventRevenueM = Array(12).fill(0);
    let productRevenueM = Array(12).fill(0);
    const purchaseFilters = { isCancelled: false };
    const bookingFilters = { Status: true };

    // Validate and apply product filter
    if (product) {
      if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ status: "error", message: "Invalid product ID" });
      }
      purchaseFilters.ProductId = new mongoose.Types.ObjectId(product);
    }

    // Apply date filtering
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // Adjust end date to include the entire day
      if (end) {
        end.setHours(23, 59, 59, 999);
      }

      // If only start date is provided
      if (start && !end) {
        purchaseFilters.createdAt = { $gte: start };
        bookingFilters.createdAt = { $gte: start };
      }
      // If only end date is provided
      else if (!start && end) {
        purchaseFilters.createdAt = { $lte: end };
        bookingFilters.createdAt = { $lte: end };
      }
      // If both start and end dates are provided
      else if (start && end) {
        purchaseFilters.createdAt = {
          $gte: start,
          $lte: end
        };
        bookingFilters.createdAt = {
          $gte: start,
          $lte: end
        };
      }
    }
    
    // Calculate total product sales by summing the quantities of each purchase
    const purchases = await Purchase.find(purchaseFilters).populate("ProductId", "price");
    console.log("Purchases:", purchases);

    if (purchases && purchases.length > 0) {
      totalProductSales = purchases.reduce(
        (acc, purchase) => acc + (purchase.Quantity || 0),
        0
      );
      totalProductRevenue = purchases.reduce(
        (acc, purchase) =>
          acc + (purchase.Quantity || 0) * (purchase.ProductId?.price || 0),
        0
      );
      purchases.forEach((purchase) => {
        const month = new Date(purchase.createdAt).getMonth();
        const quantity = purchase.Quantity || 0;
        const price = purchase.ProductId?.price || 0;
        if (quantity > 0 && price > 0) {
          console.log(`Product Revenue for Month ${month}: Quantity = ${quantity}, Price = ${price}`);
          productRevenueM[month] += quantity * price;
        }
      });
    }


    // Fetch all bookings
    const bookings = await bookingModel
      .find(bookingFilters)
      .populate("ItineraryId", "price")
      .populate("ActivityId", "price");
    console.log("Bookings found:", bookings.length);

    // Calculate total revenue from bookings
    if (bookings && bookings.length > 0) {
      totalRevenue = bookings.reduce((acc, booking) => {
        let price = 0;
        if (booking.ItineraryId) {
          price = booking.ItineraryId.price * booking.NumberOfTickets || 0;
        } else if (booking.ActivityId) {
          price = booking.ActivityId.price * booking.NumberOfTickets || 0;
        } else {
          price = booking.TotalPrice || 0;
        }
        // console.log("Current booking price:", price);
        return acc + price;
      }, 0);

      // Calculate total itinerary and event bookings
      totalItineraryBookings = bookings.filter(
        (booking) => booking.ItineraryId
      ).length;
      totalEventBookings = bookings.filter(
        (booking) => booking.ActivityId
      ).length;
      totalBookings = bookings.length;

      // Calculate revenue per month from bookings
      bookings.forEach((booking) => {
        const month = new Date(booking.createdAt).getMonth();
        if (booking.ItineraryId && booking.ItineraryId.price) {
          const revenue =
            booking.ItineraryId.price * (booking.NumberOfTickets || 0);
          console.log(`Itinerary Revenue for Month ${month}:`, revenue);
          itineraryRevenueM[month] += revenue;
        } else if (booking.ActivityId && booking.ActivityId.price) {
          const revenue =
            booking.ActivityId.price * (booking.NumberOfTickets || 0);
          console.log(`Activity Revenue for Month ${month}:`, revenue);
          eventRevenueM[month] += revenue;
        }
      });
    }

    // Calculate revenue per month from product purchases
    // purchases.forEach((purchase) => {
    //   const month = new Date(purchase.createdAt).getMonth();
    //   productRevenueM[month] +=
    //     (purchase.Quantity || 0) * (purchase.ProductId?.price || 0);
    // });

    // Send response
    res.status(200).json({
      status: "success",
      data: {
        totalRevenue,
        totalBookings,
        totalProductRevenue,
        totalItineraryBookings,
        totalEventBookings,
        totalProductSales,
        itineraryRevenueM,
        eventRevenueM,
        productRevenueM,
      },
    });
  } catch (error) {
    // Log detailed error for debugging
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const userReport = async (req, res) => {
  try {
    const users = await userModel.find();
    const userCount = users.length;
    const userRoles = {
      Tour_Guide: 0,
      Advertiser: 0,
      Seller: 0,
      Tourism_Governer: 0,
      Tourist: 0,
      Admin: 0,
    };
    let newUsersPerMonth = Array(12).fill(0);
    for (let user of users) {
      userRoles[user.role] += 1;
      const month = new Date(user.createdAt).getMonth();
      newUsersPerMonth[month] += 1;
    }
    res.status(200).json({
      status: "success",
      data: {
        userCount,
        userRoles,
        newUsersPerMonth,
      },
    });
  } catch (err) {
    res.status(500).send({ message: "error fetching user reports" });
  }
};

module.exports = {
  addAdmin,
  getUser,
  deleteUser,
  addTourismGovernor,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createTag,
  getTags,
  updateTag,
  deleteTag,
  getPendingDocuments,
  approveDocument,
  rejectDocument,
  createPromoCode,
  revenueReport,
  userReport,
};
