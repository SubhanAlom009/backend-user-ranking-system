import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the User Rank System Backend!");
});

// Import routes
import userRoutes from "./routes/user.routes.js";
import claimRoutes from "./routes/claim.routes.js";
app.use("/api/users", userRoutes);
app.use("/api/claims", claimRoutes);

export default app;
