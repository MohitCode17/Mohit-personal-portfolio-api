import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import cloudinary from "../config/cloudinary.js";
import { User } from "../models/user.model.js";
import { generateAuthToken } from "../utils/jwtToken.js";
import { config } from "../config/env-config.js";
import { sendMail } from "../utils/sendMail.js";
import crypto from "crypto";

// REGISTER USER CONTROLLER
export const handleUserRegister = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("User profile & resume are required!", 400));

  const { avatar, resume } = req.files;

  // UPLOAD AVATAR TO CLOUDINARY
  const uploadResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "Portfolio Avatar" }
  );

  if (!uploadResponseForAvatar || uploadResponseForAvatar.error) {
    console.error(
      "Cloudinary Error:",
      uploadResponseForAvatar.error || "Unknown cloudinary error"
    );

    return next(new ErrorHandler("Failed to upload avatar to cloudinary", 500));
  }

  // UPLOAD RESUME TO CLOUDINARY
  const uploadResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "Portfolio resume" }
  );

  if (!uploadResponseForResume || uploadResponseForResume.error) {
    console.error(
      "Cloudinary Error:",
      uploadResponseForResume.error || "Unknown cloudinary error"
    );

    return next(new ErrorHandler("Failed to upload resume to cloudinary", 500));
  }

  // ACCESS THE REQ BODY
  const {
    fullName,
    email,
    phone,
    intro,
    aboutMe,
    password,
    githubUrl,
    linkedinUrl,
    instagramUrl,
    twitterUrl,
    facebookUrl,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    phone,
    intro,
    aboutMe,
    password,
    githubUrl,
    linkedinUrl,
    instagramUrl,
    twitterUrl,
    facebookUrl,
    avatar: {
      public_id: uploadResponseForAvatar.public_id,
      url: uploadResponseForAvatar.secure_url,
    },
    resume: {
      public_id: uploadResponseForResume.public_id,
      url: uploadResponseForResume.secure_url,
    },
  });

  // GENERATE JWT TOKEN
  generateAuthToken(user, "User Registered!", 201, res);
});

// LOGIN USER CONTROLLER
export const handleUserLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Email and Password must be required!", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password!", 401));

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch)
    return next(new ErrorHandler("Invalid email or password!", 401));

  // GENEREATE JWT TOKEN
  generateAuthToken(user, "Login Successfully!", 200, res);
});

// LOGOUT USER CONTROLLER
export const handleUserLogout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("authToken", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out!",
    });
});

// GET USER PROFILE FOR DASHBOARD
export const handleGetProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// GET USER PROFILE FOR PORTFOLIO
export const handleGetProfileForPortFolio = catchAsyncErrors(
  async (req, res, next) => {
    const id = "668a436b6862b26589df6bf7";

    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      user,
    });
  }
);

// UPDATE PROFILE CONTROLLER
export const handleUpdateProfile = catchAsyncErrors(async (req, res, next) => {
  const updatedData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    intro: req.body.intro,
    aboutMe: req.body.aboutMe,
    githubUrl: req.body.githubUrl,
    linkedinUrl: req.body.linkedinUrl,
    instagramUrl: req.body.instagramUrl,
    twitterUrl: req.body.twitterUrl,
    facebookUrl: req.body.facebookUrl,
  };

  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);

    // GET EXISTING AVATAR PUBLIC ID AND DELETE FROM CLOUDINARY
    const avatarPublicId = user.avatar.public_id;
    await cloudinary.uploader.destroy(avatarPublicId);

    // UPLOAD NEW AVATAR TO CLOUDINARY
    const uploadResponseForAvatar = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "Portfolio Avatar" }
    );

    updatedData.avatar = {
      public_id: uploadResponseForAvatar.public_id,
      url: uploadResponseForAvatar.secure_url,
    };
  }

  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);

    // GET EXISTING RESUME PUBLIC ID AND DELETE FROM CLOUDINARY
    const resumePublicId = user.resume.public_id;
    await cloudinary.uploader.destroy(resumePublicId);

    // UPLOAD NEW RESUME TO CLOUDINARY
    const uploadResponseForResume = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "Portfolio resume" }
    );

    updatedData.resume = {
      public_id: uploadResponseForResume.public_id,
      url: uploadResponseForResume.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    user,
  });
});

// UPDATE PASSWORD CONTROLLER
export const handleUpdatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!currentPassword || !newPassword || !confirmPassword)
    return next(new ErrorHandler("All fields are required!", 400));

  const isPasswordMatch = await user.comparePassword(currentPassword);

  if (!isPasswordMatch)
    return next(new ErrorHandler("Current password do not match!", 401));

  if (newPassword !== confirmPassword)
    return next(
      new ErrorHandler("New password & confirm password must be same!", 400)
    );

  // UPDATE PASSWORD
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated!",
  });
});

// FORGOT PASSWORD CONTROLLER
export const handleForgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHandler("User not found!", 404));

  // Generate reset token
  const resetToken = user.generateResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Reset password url
  const resetPasswordUrl = `${config.dashboard_url}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl} \n\n If, You've not requested then, please ignore it.`;

  try {
    await sendMail({
      email: user.email,
      subject: "Portfolio Dashboard Password Recovery",
      message,
    });

    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// HANDLE RESET PASSWORD CONTROLLER
export const handleResetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(
      new ErrorHandler("Password & confirm password do not match.", 400)
    );

  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  generateAuthToken(user, "Password reset successfully", 200, res);
});
