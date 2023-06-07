import express from "express";
import {
  createTimeEntry,
  getTimeEntries,
  getTimeEntryById,
  updateTimeEntryById,
  deleteTimeEntryById,
} from "../controllers/timeEntryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createTimeEntry).get(protect, getTimeEntries);
router
  .route("/:id")
  .delete(protect, deleteTimeEntryById)
  .get(protect, getTimeEntryById)
  .put(protect, updateTimeEntryById);

export default router;
