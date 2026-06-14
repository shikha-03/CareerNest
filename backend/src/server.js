import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/index.js";

const port = process.env.PORT || 5000;
const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    server.listen(port, () => console.log(`CareerNest API running on port ${port}`));
  })
  .catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection", error);
  process.exit(1);
});
