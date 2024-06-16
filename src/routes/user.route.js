import express from "express";
import {
  handleUserLogin,
  handleUserLogout,
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

// ROUTE: REGISTER USER
// PATH: /api/v1/user/logout
// METHOD: GET
router.get("/logout", handleUserLogout);

export default router;
