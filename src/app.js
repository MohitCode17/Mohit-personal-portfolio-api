import express from "express";
import { errorMiddleware } from "./middleware/error.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// FILE UPLOAD MIDDLEWARE
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// IMPORTS ROUTES
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import timelineRoutes from "./routes/timeline.route.js";
import softwareRoutes from "./routes/software.route.js";

// ROUTE DECLARATION
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/timeline", timelineRoutes);
app.use("/api/v1/software", softwareRoutes);

// ERROR HANDLER MIDDLEWARE
app.use(errorMiddleware);

export { app };
