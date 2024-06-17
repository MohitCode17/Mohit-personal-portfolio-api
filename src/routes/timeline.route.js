import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { handleAddTimeline } from "../controllers/timeline.controller.js";

const router = express.Router();

// ROUTE: ADD NEW TIMELINE
// PATH: /api/v1/timeline/add
// METHOD: POST
router.post("/add", authenticate, handleAddTimeline);

export default router;
