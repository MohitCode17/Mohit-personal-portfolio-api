import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Software } from "../models/software.model.js";
import cloudinary from "../config/cloudinary.js";

// ADD SOFTWARE APPLICATION CONTROLLER
export const handleAddSoftware = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(
      new ErrorHandler("Software application icon/image required!", 400)
    );

  const { svg } = req.files;
  const { name } = req.body;

  if (!name)
    return next(new ErrorHandler("Please provide software's name!", 400));

  const uploadSvgResponse = await cloudinary.uploader.upload(svg.tempFilePath, {
    folder: "Portfolio software",
  });

  if (!uploadSvgResponse || uploadSvgResponse.error) {
    console.log(
      "Cloudinary Error:",
      uploadSvgResponse.error || "Unknown cloudinary error"
    );

    return next(new ErrorHandler("Failded to upload svg to cloudinary", 500));
  }

  const softwareApplication = await Software.create({
    name,
    svg: {
      public_id: uploadSvgResponse.public_id,
      url: uploadSvgResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New software application added!",
    softwareApplication,
  });
});

// GET ALL SOFTWARE CONTROLLER
export const handleGetSoftware = catchAsyncErrors(async (req, res, next) => {
  const softwares = await Software.find();

  if (softwares.length <= 0)
    return next(new ErrorHandler("No software added", 404));

  res.status(200).json({
    success: true,
    softwares,
  });
});

// DELETE SOFTWARE CONTROLLER
export const handleDeleteSoftware = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const software = await Software.findById(id);

  if (!software) return next(new ErrorHandler("No software found", 404));

  const svgPublicId = software.svg.public_id;

  await cloudinary.uploader.destroy(svgPublicId);
  await software.deleteOne();

  res.status(200).json({
    success: true,
    message: "Software Deleted!",
  });
});
