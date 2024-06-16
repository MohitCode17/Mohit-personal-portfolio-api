import express from "express";
import { handleUserRegister } from "../controllers/user.controller.js";

const router = express.Router();

// ROUTE: REGISTER USER
// PATH: /api/v1/user/register
// METHOD: POST
router.post("/register", handleUserRegister);

export default router;
