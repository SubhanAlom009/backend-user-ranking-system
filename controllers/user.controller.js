import { User } from "../models/user.model.js";
import { getIO } from "../socketio.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const existingUser = await User.findOne({ name });
    if (existingUser)
      return res.status(409).json({ error: "User already exists" });

    const newUser = new User({ name });
    await newUser.save();

    // Emit event to update user list on all clients
    getIO().emit("user-added", newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
