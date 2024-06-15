import express from "express";
import {
  handleDeleteMessage,
  handleGetMessages,
  handleSendMessage,
} from "../controllers/message.controller";

const router = express.Router();

// ROUTE: GET MESSAGES
// PATH: /api/v1/message
// METHOD: GET
router.get("/", handleGetMessages);

// ROUTE: SEND MESSAGE
// PATH: /api/v1/message/send
// METHOD: POST
router.post("/send", handleSendMessage);

// ROUTE: DELETE MESSAGE
// PATH: /api/v1/message/delete/:id
// METHOD: DELETE
router.delete("/delete/:id", handleDeleteMessage);

export default router;
