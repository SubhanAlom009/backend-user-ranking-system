import { Router } from "express";
import {
  claimPoints,
  getLeaderboard,
} from "../controllers/claim.controller.js";

const router = Router();

router.post("/:userId", claimPoints);
router.get("/leaderboard", getLeaderboard);

export default router;
