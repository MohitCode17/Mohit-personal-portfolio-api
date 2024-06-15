import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
      minLength: [2, "Name must contains at least 2 characters !"],
    },
    senderEmail: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      minLength: [2, "Subject must contains at least 2 characters !"],
    },
    message: {
      type: String,
      minLength: [2, "Message must contains at least 2 characters !"],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export { Message };
