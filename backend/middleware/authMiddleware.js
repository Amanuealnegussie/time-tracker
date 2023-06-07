import jwt from "jsonwebtoken";
import connection from "../config/db.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Assuming you have a connection object named `connection` to execute SQL queries
      const query = `
        SELECT *
        FROM users
        WHERE id = ?
        LIMIT 1
      `;
      const values = [decoded.id];

      const [rows] = await connection.query(query, values);
      const user = rows[0];

      if (user) {
        delete user.password; // Remove the password field from the user object
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { protect };
