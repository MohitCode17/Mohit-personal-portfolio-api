import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { handleAddSoftware } from "../controllers/softwre.controller.js";

const router = express.Router();

// ROUTE: ADD SOFTWARE
// PATH: /api/v1/software/add
// METHOD: POST
router.post("/add", authenticate, handleAddSoftware);

export default router;
