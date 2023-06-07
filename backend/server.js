import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import timeEntriesRoutes from "./routes/timeEntriesRoutes.js";
import { createTimeSchema } from "./models/timeEntryModel.js";
import { createUserSchema } from "./models/userModel.js";

dotenv.config();

createUserSchema();
createTimeSchema();

export const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/time-entries", timeEntriesRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
