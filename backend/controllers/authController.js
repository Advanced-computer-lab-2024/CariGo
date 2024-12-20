const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const sendEmail = require("./../utils/email");

const User = require("./../models/User");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const userType = req.body.role;
   console.log(req.body);
  if (userType === "admin" || userType === "Tourism_Governer") {
    return next(
      new AppError(
        "admin and tourism governers can't sign up on there own! 📛",
        400
      )
    );
  }

  if (req.body.isActive || req.body.verified) {
    return next(
      new AppError("Only Admins can verify/ avtivate/ deactivate you! 📛", 400)
    );
  }

  // console.log(userType);
  console.log(1);
  let newUserData;
  if (userType === "Advertiser") {
    newUserData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
      website_link: req.body.website,
      hotline: req.body.hotline,
      about: req.body.about,
      passwordChangedAt: Date.now(),
    };
  } else if (userType === "Tourist") {
    // console.log("object", req.body.selectedTags);
    newUserData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
      mobile_number: req.body.mobile_number,
      nationality: req.body.nationality,
      DOB: req.body.dob,
      job: req.body.job,
      passwordChangedAt: Date.now(),
      selectedTags: req.body.selectedTags
    };
  } else if (userType === "Tour_Guide"){
    newUserData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
      mobile_number: req.body.mobile_number,
      experience:req.body.experience,
      years_of_experience:req.body.years_of_experience,
      passwordChangedAt: Date.now(),
    }
    // console.log(newUserData);
  }else if(userType === "Seller"){
    newUserData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
      description: req.body.description,
      passwordChangedAt: Date.now(),
    }
  }
  else {
    // Handle other roles here or create a generic new user object
    newUserData = {
      ...req.body,
      passwordChangedAt: Date.now(),
    };
  }

  newUserData = {
    ...req.body,
    passwordChangedAt: Date.now(),
  };
  console.log(newUserData);
  try {
    const newUser = await User.create(newUserData);
    console.log("New User Created:", newUser); // Debugging log
    createSendToken(newUser, 201, res);
} catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
}

  console.log(4);
});

const createSendToken = (user, statusCode, res) => {
  console.log(5);
  console.log(user._id)
  console.log(5.4);
  const token = signToken(user._id);
  console.log(6);
  const cookieOptions = {
    //browser will delete cookie after it has expired
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  console.log(6);
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  console.log(7);
  res.cookie("jwt", token, cookieOptions);
  console.log(8);
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  // console.log(email, password);

  if (!username || !password) {
    return next(new AppError("Please provide username and password! 📛", 400));
  }

  //Check if user exists and password is correct
  const user = await User.findOne({ username: username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect username or password ❌", 401));
  }

  // send token to client
 
  createSendToken(user, 200, res);

});

exports.protect = catchAsync(async (req, res, next) => {
  //Check if token exists and get it
  let token;
  //console.log(req.headers)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("entered")
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log(token)
  if (!token) {
    return next(new AppError("You are not logged in! Please log in ❌", 401));
  }

  //Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const newUser = await User.findById(decoded.id);
  if (!newUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist ❌",
        401
      )
    );
  }

  //If user changes password after the token was issued
  if (!newUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed password! Please log in again ❌",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = newUser;

  next();
});



exports.isActive = catchAsync(async (req, res, next) => {
  if (req.user.verified === false && req.user.role === "Advertiser") {
    return next(
      new AppError(
        "Your account has not yet been verified! Please contact support! 🪪🚫",
        403
      )
    );
  } else if (req.user.isActive === false) {
    return next(
      new AppError(
        "Your account has been deactivated! Please contact support! 👤🚫",
        403
      )
    );
  }
  next();
});

exports.AcceptAdvertiser = catchAsync(async (req, res, next) => {
  const AdvertiserToAccept = await User.findById(req.params.id);

  if (!AdvertiserToAccept) {
    return next(new AppError("No user found with that ID👤❌", 404));
  }

  if (AdvertiserToAccept.role !== "Advertiser") {
    return next(new AppError("This user is not a Advertiser 👤❌", 403));
  }
  AdvertiserToAccept.verified = true;
  const data = await AdvertiserToAccept.save({ validateBeforeSave: false });
  return res.status(200).json({
    status: "success",
    data: {
      message: "Advertiser Accepted",
      data,
    },
  });
});

exports.restrictTo = (...roles) => {

  return (req, res, next) => {
    // console.log(req.user.role)
    // console.log("verifying role");
    if (!roles.includes(req.user.role)) {

      return next(
        new AppError("You do not have permission to access this route ❌", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
   
  // if email does not exist
  if (!user) {
    return next(new AppError("There is no user with email address 📧❌", 404));
  }

  // Generate the random token for reset
  const resetToken = user.createPasswordResetToken();

  //because we only modified it not saved it
  //because no name ..etc that are required, then close validations
  await user.save({ validateBeforeSave: false });

  // Send token to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/cariGo/users/resetPassword/${resetToken}`;
 const url = `http://localhost:3000/OTP/?resetPasswordUrl=${resetURL}`
  //const userMessage = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL} 🔑.\nIf you didn't forget your password, please ignore this email!`;
  const message =  `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${url} 🔑.\nIf you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min) 🔑🕑",
      message,
    });

    res.status(200).json({
      url:resetURL,
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
   
    return next(
      new AppError("There was an error sending the email. Try again later! ❌"),
      500
    );
  }
});


exports.resetPassword = catchAsync(async (req, res, next) => {
  // get user by token
  console.log(req.params.token)
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  console.log(user)
  // set new password if token isn't expired and there is a user
  if (!user) {
    return next(
      new AppError("Token is invalid or expired. Please try again.", 400)
    );
  }
  console.log(req.body.password +" "+req.body.passwordConfirm)
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // update changedPasswordAt property for user

  // log user in , sent jwt

  createSendToken(user, 200, res);
});

exports.changePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // console.log(req.body)

  // 2) Check if POSTed current password is correct
  if (!req.body.currentPassword) {
    return next(new AppError('Please provide your current password', 400));
  }

  if (!user.password) {
    return next(new AppError('Current user password not found', 500));
  }

  const isCorrect = await user.correctPassword(req.body.currentPassword, user.password);

  if (!isCorrect) {
    return next(new AppError('Your current password is incorrect', 401));
  }

  // 3) If so, update password
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new AppError('Please provide new password and password confirmation', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  try {
    await user.save();
    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
  } catch (error) {
    console.error('Error saving new password:', error);
    return next(new AppError('Error updating password. Please try again.', 500));
  }
});