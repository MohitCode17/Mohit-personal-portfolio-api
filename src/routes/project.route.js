import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { handleAddProject } from "../controllers/project.controller.js";

const router = express.Router();

// ROUTE: ADD PROJECT
// PATH: /api/v1/project/add
// METHOD: POST
router.post("/add", authenticate, handleAddProject);

export default router;
