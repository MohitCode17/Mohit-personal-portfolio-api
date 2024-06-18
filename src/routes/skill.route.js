import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { handleAddSkill } from "../controllers/skill.controller.js";

const router = express.Router();

// ROUTE: ADD SOFTWARE
// PATH: /api/v1/software/add
// METHOD: POST
router.post("/add", authenticate, handleAddSkill);

export default router;
