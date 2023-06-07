import express from "express";
import {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .delete(protect, deleteUser)
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").get(protect, getUserById);

export default router;
