import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  handleAddSoftware,
  handleGetSoftware,
} from "../controllers/softwre.controller.js";

const router = express.Router();

// ROUTE: ADD SOFTWARE
// PATH: /api/v1/software/add
// METHOD: POST
router.post("/add", authenticate, handleAddSoftware);

// ROUTE: GET ALL SOFTWARE
// PATH: /api/v1/software/getall
// METHOD: GET
router.get("/getall", handleGetSoftware);

export default router;
