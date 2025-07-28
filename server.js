import app from "./app.js";
import http from "http";
import { connectDB } from "./DB/connectDB.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if the database connection fails
  });
