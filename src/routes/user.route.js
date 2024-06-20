import express from "express";
import {
  handleForgotPassword,
  handleGetProfile,
  handleGetProfileForPortFolio,
  handleUpdatePassword,
  handleUpdateProfile,
  handleUserLogin,
  handleUserLogout,
  handleUserRegister,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authenticate.js";

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
router.get("/logout", authenticate, handleUserLogout);

// ROUTE: GET USER PROFILE
// PATH: /api/v1/user/me
// METHOD: GET
router.get("/me", authenticate, handleGetProfile);

// ROUTE: GET USER PROFILE FOR PORTFOLIO
// PATH: /api/v1/user/me/portfolio
// METHOD: GET
router.get("/me/portfolio", handleGetProfileForPortFolio);

// ROUTE: UPDATE USER PROFILE
// PATH: /api/v1/user/me/profile/update
// METHOD: PUT
router.put("/me/profile/update", authenticate, handleUpdateProfile);

// ROUTE: UPDATE USER PASSWORD
// PATH: /api/v1/user/password/update
// METHOD: PUT
router.put("/password/update", authenticate, handleUpdatePassword);

// ROUTE: FORGOT USER PASSWORD
// PATH: /api/v1/user/password/forgot
// METHOD: POST
router.post("/password/forgot", handleForgotPassword);

export default router;
