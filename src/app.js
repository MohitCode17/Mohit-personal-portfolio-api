import express from "express";
import { errorMiddleware } from "./middleware/error.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/env-config.js";

const app = express();

// CORS CONFIG
app.use(
  cors({
    origin: [config.frontend_url, config.dashboard_url],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
import skillRoutes from "./routes/skill.route.js";
import projectRoutes from "./routes/project.route.js";

// ROUTE DECLARATION
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/timeline", timelineRoutes);
app.use("/api/v1/software", softwareRoutes);
app.use("/api/v1/skill", skillRoutes);
app.use("/api/v1/project", projectRoutes);

// ERROR HANDLER MIDDLEWARE
app.use(errorMiddleware);

export { app };
