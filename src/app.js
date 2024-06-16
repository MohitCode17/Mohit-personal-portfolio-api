import express from "express";
import { errorMiddleware } from "./middleware/error.js";
import fileUpload from "express-fileupload";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FILE UPLOAD MIDDLEWARE
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// IMPORTS ROUTES
import messageRoutes from "./routes/message.route.js";

// ROUTE DECLARATION
app.use("/api/v1/message", messageRoutes);

// ERROR HANDLER MIDDLEWARE
app.use(errorMiddleware);

export { app };
