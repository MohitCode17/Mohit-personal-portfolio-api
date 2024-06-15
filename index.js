import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { config } from "./src/config/env-config.js";

const startServer = async () => {
  // CONNECT WITH DATABASE
  await connectDB();

  const PORT = config.port;

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

startServer();
