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

// GET ALL PROJECTS CONTROLLER
export const handleGetProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();

  if (projects.length <= 0)
    return next(new ErrorHandler("No projects found!", 404));

  res.status(200).json({
    success: true,
    projects,
  });
});

// GET PROJECT CONTROLLER
export const handleGetProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) return next(new ErrorHandler("No project found!", 404));

  res.status(200).json({
    success: true,
    project,
  });
});

// UPDATE PROJECT CONTROLLER
export const handleUpdateProject = catchAsyncErrors(async (req, res, next) => {
  const updatedData = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    technologies: req.body.technologies,
    stack: req.body.stack,
    deployed: req.body.deployed,
  };

  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);

    // GET EXISTING IMAGE PUBLIC ID AND DELETE FROM CLOUDINARY
    const bannerPublicId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(bannerPublicId);

    // UPLOAD NEW AVATAR TO CLOUDINARY
    const uploadResponseForBanner = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "Portfolio projects" }
    );

    updatedData.projectBanner = {
      public_id: uploadResponseForBanner.public_id,
      url: uploadResponseForBanner.secure_url,
    };
  }

  const project = await Project.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Project Updated!",
    project,
  });
});
