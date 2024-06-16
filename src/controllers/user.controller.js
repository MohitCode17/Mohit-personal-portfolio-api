import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import cloudinary from "../config/cloudinary.js";
import { User } from "../models/user.model.js";
import { generateAuthToken } from "../utils/jwtToken.js";

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
