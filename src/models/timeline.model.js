import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Timeline title is required!"],
    },
    description: {
      type: String,
      required: [true, "Timeline description is required!"],
    },
    timeline: {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Timeline = mongoose.model("Timeline", timelineSchema);

export { Timeline };
