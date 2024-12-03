const User = require("../models/User.js");
const mongoose = require("mongoose");
const productModel = require("../models/Product.js");
const PromoCode = require("../models/PromoCode"); // Adjust the path as necessary

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({
    isActive: true,
    documentApprovalStatus: "Pending",
    role: { $ne: "Tourist" },
  }).sort({ createdAt: -1 });

  res.status(200).json(users);
};

// get a single workout
const getUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  const user = await User.findById(id).populate("wishList");
  console.log(user);

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

const updateUserData = (req, res) => {
  const update = req.body;
  console.log(update + "  llllllll");

  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    console.log("inside the update");
    User.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.userId) },
      { $set: update }
    )
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "couldn't update user data" });
      });
  } else {
    res
      .status(500)
      .json({ error: "couldn't update user data, user id invalid" });
  }
};

const UpdateWallet = async (req, res) => {
  const UserId = req.user.id; // User ID from request body
  const { numOfTickets, price, conversionRate } = req.body; // Event ID from URL parameters
  console.log(UserId);
  if (mongoose.Types.ObjectId.isValid(UserId)) {
    try {
      const user = await User.findById(UserId);
      //console.log(itinerary);

      const refund = price * conversionRate * numOfTickets;
      const cashBack = user.wallet + refund;
      const walletNewValue = await User.updateOne(
        { _id: UserId }, // Filter to find documents with both UserId and ItineraryId
        { $set: { wallet: cashBack } } // Update to set Status to false
      );
      res.status(200).json({
        message: "refund done successfully",
        updatedWallet: walletNewValue.modifiedCount, // shows how many bookings were updated
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
      console.error("Error while refunding:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid user ID format" });
  }
};

const RedeemPoints = async (req, res) => {
  const UserId = req.user.id; // User ID from request body
  const { numOfPoints } = req.body; // Event ID from URL parameters
  console.log(UserId);
  if (mongoose.Types.ObjectId.isValid(UserId)) {
    try {
      const user = await User.findById(UserId);
      //console.log(itinerary);
      const cash = numOfPoints / 10;
      const cashBack = user.wallet + cash;
      const newPoints = user.pointsAvailable - numOfPoints;
      const updatedPoints = await User.updateOne(
        { _id: UserId }, // Filter to find documents with both UserId and ItineraryId
        { $set: { pointsAvailable: newPoints, wallet: cashBack } }
      );
      res.status(200).json({
        message: "Points redeemed successfully.",
        updatedPoints: updatedPoints.modifiedCount, // shows how many bookings were updated
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
      console.error("Error while redeeming:", error);
    }
  } else {
    res.status(400).json({ error: "Invalid user ID format" });
  }
};

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const birthDayPromoCode = async () => {
  try {
    const users = await User.find(); // Fetch all users
    const today = new Date();
    for (const user of users) {
      const birthDay = new Date(user.DOB);
      const dayOfBirth = birthDay.getDate();
      const monthOfBirth = birthDay.getMonth() + 1;

      const todayDate = today.getDate();
      const todayMonth = today.getMonth() + 1;

      if (dayOfBirth === todayDate && monthOfBirth === todayMonth) {
        //create promo code
        let randomNumber = Math.floor(Math.random() * 900) + 100;

        let code = `HB${randomNumber}${dayOfBirth}`;
        const discount = 30;
        const expirationDate = new Date(today); // Create a copy of today's date
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        // Check if the promo code already exists
        let existingPromo = await PromoCode.findOne({ code });

        while (existingPromo) {
          randomNumber = Math.floor(Math.random() * 900) + 100;
          code = `HB${randomNumber}${dayOfBirth}`;
          existingPromo = await PromoCode.findOne({ code });
        }

        // Create a new promo code
        const promoCode = await PromoCode.create({
          code,
          discount,
          expirationDate,
          isActive: true,
          codeType: "birthDay",
        });

        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const info = await transporter.sendMail({
          from: '"CariGo 🦌" <Carigo@test.email>',
          to: user.email, // Send to the user's email
          subject: "Happy Birthday! 🎉 Here's Your Promo Code!",
          text: "Happy Birthday! Use this promo code to celebrate your day with us!",
          html: `<p>Happy Birthday! 🎉 Use this promo code to celebrate your day with us!<br/>promo code:<strong>${code}</strong><br/><strong>please note this promo code will expire on ${expirationDate.toDateString()}</strong></p>`,
        });

        console.log("Message sent to %s: %s", user.email, info.messageId);
      }
    }
    console.log({ message: "promo code sent successfully." });
  } catch (error) {
    console.error({ error: "Failed to fetch user" });
    console.error("Error while redeeming:", error);
  }
};

const schedule = require("node-schedule");

const job = schedule.scheduleJob("0 0 * * *", () => {
  birthDayPromoCode();
});

// const getWishList = async (req, res) => {
//   const UserId = req.user.id; // User ID from request body

//   try {
//     const user = await User.findById(UserId).populate("wishList");

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({
//       status: "success",
//       data: user.wishList,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Failed to fetch wishlist",
//       error: error.message,
//     });
//   }
// };

module.exports = {
  getUsers,
  getUser,
  updateUserData,
  UpdateWallet,
  RedeemPoints,
  // getWishList,
  //   deleteWorkout,
  //   updateWorkout
};
