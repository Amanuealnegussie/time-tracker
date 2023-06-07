import generateToken from "../utils/generateToken.js";
import connection from "../config/db.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { areAllFieldsFilled } from "../utils/areAllFieldsFilled.js";
import jwt from "jsonwebtoken";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!areAllFieldsFilled([email, password])) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const query = `
      SELECT *
      FROM users
      WHERE email = ?
      LIMIT 1
    `;
  const values = [email];

  const [rows] = await connection.query(query, values);
  const user = rows[0];

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!areAllFieldsFilled([name, email, password])) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const checkQuery = `
      SELECT *
      FROM users
      WHERE email = ?
      LIMIT 1
    `;
  const checkValues = [email];

  const [checkRows] = await connection.query(checkQuery, checkValues);
  const userExists = checkRows.length > 0;

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createQuery = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;
  const createValues = [name, email, hashedPassword];

  const [createResult] = await connection.query(createQuery, createValues);
  const createdUserId = createResult.insertId;

  if (createdUserId) {
    res.status(201).json({
      _id: createdUserId,
      name,
      email,
      token: generateToken(createdUserId), // Use your token generation method to generate a token
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;

  const query = `
      SELECT *
      FROM users
      WHERE id = ?
      LIMIT 1
    `;
  const values = [userId];

  const [rows] = await connection.query(query, values);
  const user = rows[0];

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT id, name, email
    FROM users
    WHERE id = ?
    LIMIT 1
  `;
  const values = [userId];

  const [rows] = await connection.query(query, values);
  const user = rows[0];

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const query = `
      SELECT *
      FROM users
    `;

  try {
    const [rows] = await connection.query(query);
    const users = rows;

    res.json(users);
  } catch (error) {
    throw new Error("Server Error");
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;

  const checkQuery = `
      SELECT *
      FROM users
      WHERE id = ?
      LIMIT 1
    `;
  const checkValues = [userId];

  const [checkRows] = await connection.query(checkQuery, checkValues);
  const userExists = checkRows.length > 0;

  if (userExists) {
    const deleteTimeEntriesQuery = `
            DELETE FROM time_entries
            WHERE userId = ?
          `;
    const deleteTimeEntriesValues = [userId];

    await connection.query(deleteTimeEntriesQuery, deleteTimeEntriesValues);
    const deleteQuery = `
          DELETE FROM users
          WHERE id = ?
        `;
    const deleteValues = [userId];

    await connection.query(deleteQuery, deleteValues);

    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;

  const selectUserQuery = `
    SELECT *
    FROM users
    WHERE id = ?
    LIMIT 1
  `;
  const selectUserValues = [userId];

  const [rows] = await connection.query(selectUserQuery, selectUserValues);
  const user = rows[0];

  if (user) {
    const updatedUser = { ...user };
    if (!areAllFieldsFilled([req.body.name])) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Update the user name if provided
    updatedUser.name = req.body.name || user.name;

    const updateUserQuery = `
      UPDATE users
      SET name = ?
      WHERE id = ?
    `;
    const updateUserValues = [updatedUser.name, userId];

    await connection.query(updateUserQuery, updateUserValues);

    res.json({
      _id: userId,
      name: updatedUser.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(userId),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUserProfile,
  getUserById,
};
