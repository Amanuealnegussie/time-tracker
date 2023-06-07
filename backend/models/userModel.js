import connection from "../config/db.js";

export const createUserSchema = async () => {
  try {
    // Define the user schema fields
    const userSchema = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    await connection.query(userSchema);
  } catch (error) {
    console.error("Failed to create TimeEntry schema:", error);
  }
};
