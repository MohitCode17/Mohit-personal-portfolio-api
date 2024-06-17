import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  handleAddTimeline,
  handleGetTimelines,
} from "../controllers/timeline.controller.js";

const router = express.Router();

// ROUTE: ADD NEW TIMELINE
// PATH: /api/v1/timeline/add
// METHOD: POST
router.post("/add", authenticate, handleAddTimeline);

// ROUTE: GET TIMELINES
// PATH: /api/v1/timeline/getall
// METHOD: GET
router.get("/getall", handleGetTimelines);

export default router;
