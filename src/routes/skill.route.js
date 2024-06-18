import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  handleAddSkill,
  handleGetSkills,
  handleUpdateSkills,
} from "../controllers/skill.controller.js";

const router = express.Router();

// ROUTE: ADD SKILLS
// PATH: /api/v1/skill/add
// METHOD: POST
router.post("/add", authenticate, handleAddSkill);

// ROUTE: GET ALL SKILLS
// PATH: /api/v1/skill/getall
// METHOD: GET
router.get("/getall", authenticate, handleGetSkills);

// ROUTE: UPDATE SKILLS
// PATH: /api/v1/skill/update/:id
// METHOD: PUT
router.put("/update/:id", authenticate, handleUpdateSkills);

export default router;
