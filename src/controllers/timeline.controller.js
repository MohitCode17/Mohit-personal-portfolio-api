import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Timeline } from "../models/timeline.model.js";

// ADD NEW TIMELINE CONTROLLER
export const handleAddTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;

  if (!title || !description)
    return next(new ErrorHandler("All fields are required!", 400));

  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });

  res.status(201).json({
    success: true,
    message: "Timeline Added!",
    newTimeline,
  });
});

// GET TIMELINES CONTROLLER
export const handleGetTimelines = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find();

  if (timelines.length <= 0)
    return next(new ErrorHandler("No timeline is created yet!", 404));

  res.status(200).json({
    success: true,
    timelines,
  });
});

// DELETE TIMELINE CONTROLLER
export const handleDeleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);

  if (!timeline) return next(new ErrorHandler("Timeline not found!", 404));

  await timeline.deleteOne();

  res.status(200).json({
    success: true,
    messages: "Timeline deleted!",
  });
});
