import connection from "../config/db.js";

export const createTimeSchema = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS time_entries (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userId INT NOT NULL,
          task VARCHAR(255) NOT NULL,
          startTime TIME NOT NULL,
          endTime TIME NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `;
    await connection.query(query);
  } catch (error) {
    console.error("Failed to create TimeEntry schema:", error);
  }
};
