import express from "express";

const app = express();

// TEST API
app.get("/api/test", (req, res) => {
  res.send("Test Passed !");
});

export { app };
