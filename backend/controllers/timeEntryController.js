import connection from "../config/db.js";
import jwt from "jsonwebtoken";
import { areAllFieldsFilled } from "../utils/areAllFieldsFilled.js";
import asyncHandler from "express-async-handler";
import { isValidTime } from "../utils/isValidTime.js";

// @desc    Create a new time entry
// @route   POST /time-entries
// @access  Private
const createTimeEntry = asyncHandler(async (req, res) => {
  const { task, startTime, endTime } = req.body;
  if (!areAllFieldsFilled([task, startTime, endTime])) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (!isValidTime(startTime, endTime)) {
    res.status(400);
    throw new Error("Please fill in a correct time input");
  }

  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const query =
      "INSERT INTO time_entries (userId, task, startTime, endTime) VALUES (?, ?, ?, ?)";
    const result = await connection.query(query, [
      userId,
      task,
      startTime,
      endTime,
    ]);
    const newTimeEntryId = result.insertId;
    res
      .status(201)
      .json({ id: newTimeEntryId, userId, task, startTime, endTime });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to create time entry");
  }
});

// @desc    Get a list of all time entries
// @route   GET /time-entries
// @access  Private
const getTimeEntries = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT * FROM time_entries ORDER BY startTime ASC";
    const results = await connection.query(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to retrieve time entries");
  }
});

// @desc    Get a specific time entry by ID
// @route   GET /time-entries/:id
// @access  Private
const getTimeEntryById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM time_entries WHERE id = ?";
    const results = await connection.query(query, [id]);
    if (results.length === 0) {
      res.status(404).json({ error: "Time entry not found" });
    } else {
      res.status(200).json(results[0]);
    }
  } catch (error) {
    res.status(500);
    throw new Error("Failed to retrieve time entry");
  }
});

// @desc    Update a specific time entry by ID
// @route   PUT /time-entries/:id
// @access  Private
const updateTimeEntryById = asyncHandler(async (req, res) => {
  const { task, startTime, endTime } = req.body;

  if (!areAllFieldsFilled([task, startTime, endTime])) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (!isValidTime(startTime, endTime)) {
    res.status(400);
    throw new Error("Please fill in a correct time input");
  }
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const id = req.params.id;

    const query =
      "UPDATE time_entries SET userId = ?, task = ?, startTime = ?, endTime = ? WHERE id = ?";
    const result = await connection.query(query, [
      userId,
      task,
      startTime,
      endTime,
      id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Time entry not found" });
    } else {
      res.status(200).json({ id, userId, task, startTime, endTime });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Delete a specific time entry by ID
// @route   DELETE /time-entries/:id
// @access  Private
const deleteTimeEntryById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM time_entries WHERE id = ?";
    const result = await connection.query(query, [id]);
    if (result.affectedRows === 0) {
      res.status(404);
      throw new Error("Time entry not found");
    } else {
      res.status(200).json({ message: "Time entry deleted successfully" });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export {
  createTimeEntry,
  getTimeEntries,
  getTimeEntryById,
  updateTimeEntryById,
  deleteTimeEntryById,
};
