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

// GET ALL SKILLS CONTROLLER
export const handleGetSkills = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skill.find();

  if (skills.length <= 0)
    return next(new ErrorHandler("No skills added!", 404));

  res.status(200).json({
    success: true,
    skills,
  });
});

// UPDATE SKILLS CONTROLLER
export const handleUpdateSkills = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let skill = await Skill.findById(id);
  if (!skill) return next(new ErrorHandler("Skill not found!", 404));

  const { proficiency } = req.body;

  skill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Skill updated!",
    skill,
  });
});

// DELETE SKILL CONTROLLER
export const handleDeleteSkills = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let skill = await Skill.findById(id);
  if (!skill) return next(new ErrorHandler("Skill already deleted!", 404));

  const skillPublicId = skill.svg.public_id;
  await cloudinary.uploader.destroy(skillPublicId);
  await skill.deleteOne();

  res.status(200).json({
    success: true,
    message: "Skill Deleted!",
  });
});
