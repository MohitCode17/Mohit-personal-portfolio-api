import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Fullname is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    aboutMe: {
      type: String,
      required: [true, "About me section is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [8, "Password must contains at least 8 or more characters!"],
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    githubUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
    facebookUrl: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// HASHING PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

export { User };