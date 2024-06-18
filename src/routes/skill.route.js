import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { handleAddSkill, handleGetSkills } from "../controllers/skill.controller.js";

const router = express.Router();

// ROUTE: ADD SKILLS
// PATH: /api/v1/skill/add
// METHOD: POST
router.post("/add", authenticate, handleAddSkill);

// ROUTE: GET ALL SKILLS
// PATH: /api/v1/skill/getall
// METHOD: GET

router.get("/getall", authenticate, handleGetSkills);

export default router;
