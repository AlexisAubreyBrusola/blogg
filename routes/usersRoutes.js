import express from "express";
export const router = express.Router();

import { loginUser, registerUser, getUserData } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js"


router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserData);