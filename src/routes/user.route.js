import express from "express";
import {
  handleUserLogin,
  handleUserRegister,
} from "../controllers/user.controller.js";

const router = express.Router();

// ROUTE: REGISTER USER
// PATH: /api/v1/user/register
// METHOD: POST
router.post("/register", handleUserRegister);

// ROUTE: REGISTER USER
// PATH: /api/v1/user/login
// METHOD: POST
router.post("/login", handleUserLogin);

export default router;
