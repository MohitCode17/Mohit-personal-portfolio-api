import mongoose from "mongoose";

const softwareSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  svg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const Software = mongoose.model("Software", softwareSchema);

export { Software };
