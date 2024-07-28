import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gitRepoLink: String,
    projectLink: String,
    stack: String,
    deployed: String,
    tags: {
      type: [{ type: String }],
      required: true,
    },
    projectBanner: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export { Project };
