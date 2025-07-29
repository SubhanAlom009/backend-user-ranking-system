import { ClaimHistory } from "../models/claimHistory.model.js";
import { User } from "../models/user.model.js";
import { getIO } from "../socketio.js";

export const claimPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const randomPoints = Math.floor(Math.random() * 10) + 1;

    user.totalPoints += randomPoints;
    await user.save();

    const history = await ClaimHistory.create({
      user: user._id,
      pointsClaimed: randomPoints,
    });
    await history.save();

    // Emit event to update leaderboard on all clients
    getIO().emit("points-claimed", {
      userId: user._id,
      name: user.name,
      totalPoints: user.totalPoints,
      claimedPoints: randomPoints,
    });

    res.status(200).json({
      message: "Points claimed successfully",
      user,
      claimedPoints: randomPoints,
    });
  } catch (error) {
    console.error("Error claiming points:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      totalPoints: user.totalPoints,
      _id: user._id,
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
