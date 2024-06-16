import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env-config.js";
import { User } from "../models/user.model.js";

export const authenticate = catchAsyncErrors(async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken)
    return next(new ErrorHandler("User is not authenticated!", 401));

  const decoded = jwt.verify(authToken, config.jwt_secret_key);

  req.user = await User.findById(decoded.id);
  next();
});
