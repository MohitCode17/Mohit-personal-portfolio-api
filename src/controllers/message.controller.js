import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

// SEND MESSAGE CONTROLLER
export const handleSendMessage = catchAsyncErrors(async (req, res, next) => {});

// DELETE MESSAGE CONTROLLER
export const handleDeleteMessage = catchAsyncErrors(
  async (req, res, next) => {}
);

// GET MESSAGES CONTROLLER
export const handleGetMessages = catchAsyncErrors(async (req, res, next) => {});
