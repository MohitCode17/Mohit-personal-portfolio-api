import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  handleAddTimeline,
  handleDeleteTimeline,
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

// ROUTE: DELETE TIMELINE
// PATH: /api/v1/timeline/delete/:id
// METHOD: DELETE
router.delete("/delete/:id", handleDeleteTimeline);

export default router;
