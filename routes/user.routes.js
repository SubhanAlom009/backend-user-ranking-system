import { Router } from "express";
import { addUser, getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/", addUser);

export default router;
