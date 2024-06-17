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
