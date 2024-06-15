import express from "express";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TEST API
app.get("/api/test", (req, res) => {
  res.send("Test Passed !");
});

export { app };
