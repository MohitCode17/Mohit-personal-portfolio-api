import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  handleAddProject,
  handleGetProjects,
} from "../controllers/project.controller.js";

const router = express.Router();

// ROUTE: ADD PROJECT
// PATH: /api/v1/project/add
// METHOD: POST
router.post("/add", authenticate, handleAddProject);

// ROUTE: GET ALL PROJECTS
// PATH: /api/v1/project/getall
// METHOD: GET
router.get("/getall", handleGetProjects);

export default router;
