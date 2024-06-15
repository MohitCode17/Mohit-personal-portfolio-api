import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Message } from "../models/message.model.js";

// SEND MESSAGE CONTROLLER
export const handleSendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, senderEmail, subject, message } = req.body;

  if (!senderName || !senderEmail || !subject)
    return next(new ErrorHandler("All fields are required !", 400));

  const newMessage = await Message.create({
    senderName,
    senderEmail,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message Sent.",
    newMessage,
  });
});

// DELETE MESSAGE CONTROLLER
export const handleDeleteMessage = catchAsyncErrors(
  async (req, res, next) => {}
);

// GET MESSAGES CONTROLLER
export const handleGetMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();

  if (messages.length <= 0)
    return next(new ErrorHandler("No messages found !", 404));

  res.status(200).json({
    success: true,
    messages,
  });
});
