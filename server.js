import app from "./app.js";
import http from "http";
import { connectDB } from "./DB/connectDB.js";
import { setupSocket } from "./socketio.js"; // <-- import

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

setupSocket(server);
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
