import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env-config.js";
import crypto from "crypto";

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
      select: false,
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

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// GENERATE JWT TOKEN
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, config.jwt_secret_key, {
    expiresIn: "10d",
  });
};

// GENERATE RESET PASSWORD TOKEN
userSchema.methods.generateResetPasswordToken = function () {
  // Generate Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and Add Reset Token to UserSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set Reset Token Expires Time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export { User };
