import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  handleAddSkill,
  handleDeleteSkills,
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
router.get("/getall", handleGetSkills);

// ROUTE: UPDATE SKILLS
// PATH: /api/v1/skill/update/:id
// METHOD: PUT
router.put("/update/:id", authenticate, handleUpdateSkills);

// ROUTE: DELETE SKILLS
// PATH: /api/v1/skill/delete/:id
// METHOD: DELETE
router.delete("/delete/:id", authenticate, handleDeleteSkills);

export default router;
