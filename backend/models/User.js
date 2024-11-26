const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const experienceSchema = require("./Experience");
const activitySchema = require("./Activity");
// const productSchema = require("./Product");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 15,
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    role: {
      type: String,
      enum: [
        "Admin",
        "Tourist",
        "Tour_Guide",
        "Advertiser",
        "Seller",
        "Tourism_Governer",
      ],
    },
    mobile_number: {
      type: String,
    },
    nationality: String,
    DOB: {
      type: Date,
    },
    job: String,
    wallet: {
      type: Number,
      default: 0.0,
    },
    experience: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Experience", // References the 'Rating' model
        default: [],
        required: [false],
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // Rounding ratings
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    previous_work: [String],
    years_of_experience: {
      type: Number,
      default: 0,
    },
    sellerName: {
      type: String,
    },
    description: {
      type: String,
    },
    website_link: {
      type: String,
      validate: {
        validator: function (url) {
          return validator.isURL(url, {
            protocols: ["http", "https"],
            require_protocol: true,
            require_valid_protocol: true,
          });
        },
        message: "Please enter a valid URL",
      },
    },
    hotline: {
      type: Number,
    },
    activities: [
      {
        type: mongoose.Schema.ObjectId,
        default: undefined,
        default: [],
      },
    ],
    about: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    activityGuests: {
      type: Number,
      default: 0,
    },
    refreshToken: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    photo: String,
    idDocument: String,
    documentApprovalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    certificates: {
      type: [String], // Array of paths to certificates (for Tour Guide)
    },
    taxationRegistryCard: {
      type: String, // Path to the taxation registry card (for Advertisers/Sellers)
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    badge: {
      type: String,
      default: "Bronze",
    },
    pointsAvailable: {
      type: Number,
      default: 0,
    },
    selectedTags: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Tag",
        },
      ],
    },
    wishList: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
      ],
    },
    addresses: {
      type: [
        {
          street: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          postalCode: { type: String, required: true },
          country: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

/////// Middleware to hash passwords before saving /////////

userSchema.pre("save", async function (next) {
  //run if password is actually changed
  if (!this.isModified("password")) {
    return next();
  }

  //Hash password
  this.password = await bcrypt.hash(this.password, 12);

  // Clear passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  //Password is changed or created
  if (!this.isModified("password") || this.isNew) return next();

  //store time it got changed or created at
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // compare the JWT timestamp with the changed password timestamp
    return JWTTimestamp < changedTimestamp;
  }

  //not changed then:
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

userSchema.methods.addLoyaltyPoints = function (amountPaid) {
  let pointsMultiplier;
  switch (this.level) {
    case 1:
      pointsMultiplier = 0.5;
      break;
    case 2:
      pointsMultiplier = 1;
      break;
    case 3:
      pointsMultiplier = 1.5;
      break;
    default:
      pointsMultiplier = 0.5;
  }

  this.loyaltyPoints += Math.floor(amountPaid * pointsMultiplier);
  this.updateLevelAndBadge();
};

userSchema.methods.addAvailablePoints = function (amountPaid) {
  let pointsMultiplier;
  switch (this.level) {
    case 1:
      pointsMultiplier = 0.5;
      break;
    case 2:
      pointsMultiplier = 1;
      break;
    case 3:
      pointsMultiplier = 1.5;
      break;
    default:
      pointsMultiplier = 0.5;
  }

  this.pointsAvailable += Math.floor(amountPaid * pointsMultiplier);
  // this.updateLevelAndBadge();
};

userSchema.methods.updateLevelAndBadge = function () {
  if (this.loyaltyPoints <= 100000) {
    this.level = 1;
    this.badge = "Bronze";
  } else if (this.loyaltyPoints <= 500000) {
    this.level = 2;
    this.badge = "Silver";
  } else {
    this.level = 3;
    this.badge = "Gold";
  }
};

const User = mongoose.model("User", userSchema, "User");

module.exports = User;
