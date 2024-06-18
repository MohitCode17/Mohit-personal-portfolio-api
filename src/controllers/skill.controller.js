import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import cloudinary from "../config/cloudinary.js";
import { Skill } from "../models/skill.model.js";

// ADD SKILL CONTROLLER
export const handleAddSkill = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Skills icon/image required!", 400));

  const { svg } = req.files;
  const { title, proficiency } = req.body;

  if (!title || !proficiency)
    return next(new ErrorHandler("All fields are required!", 400));

  const uploadSvgResponse = await cloudinary.uploader.upload(svg.tempFilePath, {
    folder: "Portfolio skills",
  });

  if (!uploadSvgResponse || uploadSvgResponse.error) {
    console.log(
      "Cloudinary Error:",
      uploadSvgResponse.error || "Unknown cloudinary error"
    );

    return next(new ErrorHandler("Failded to upload svg to cloudinary", 500));
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: uploadSvgResponse.public_id,
      url: uploadSvgResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New skill added!",
    skill,
  });
});
