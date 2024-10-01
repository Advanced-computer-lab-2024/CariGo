const mongoose = require("mongoose");
const validator = require("validator");

const schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
    minLength: 15,
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
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      //ONLY WORKS ON CREATE AND SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  roles: {
    type: [String],
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
  wallet: {
    type: Number,
    default: 0.0,
  },
  experience: {
    type: [experienceSchema],
    default: undefined,
  },
  sellerName: {
    type: String,
  },
  description: {
    type: String,
  },
  products: {
    type: [productSchema],
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
  activities: {
    type: [activitySchema],
    default: undefined,
  },
  about:{
    type: String,
    required: [true, "Please add the Company info"]
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  verified:{
    type: Boolean,
    default: false
  },
  activityGuests:{
    type: Number,
    default: 0
  },
  refreshToken: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

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

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Users = mongoose.model("User", userSchema);

module.exports = Users;




