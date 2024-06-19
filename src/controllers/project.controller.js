import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import cloudinary from "../config/cloudinary.js";
import { Project } from "../models/project.model.js";

// ADD PROJECT CONTROLLER
export const handleAddProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Project banner is required!", 400));

  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !technologies ||
    !stack ||
    !deployed
  )
    return next(new ErrorHandler("All fields are required!", 400));

  const uploadProjectBannerResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    {
      folder: "Portfolio projects",
    }
  );

  if (!uploadProjectBannerResponse || uploadProjectBannerResponse.error) {
    console.log(
      "Cloudinary Error:",
      uploadProjectBannerResponse.error || "Unknown cloudinary error"
    );

    return next(
      new ErrorHandler("Failded to upload project banner to cloudinary", 500)
    );
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
    projectBanner: {
      public_id: uploadProjectBannerResponse.public_id,
      url: uploadProjectBannerResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New project added!",
    project,
  });
});
