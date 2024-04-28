import jwt from "jsonwebtoken";
import { logInfo, logError } from "../util/logging.js";


export const requireAuth = (req, res, next) => {
  const session = req.cookies.session;

  logInfo("Verifying token in session cookie...");

  // Verify token which is in cookie value
  jwt.verify(session, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      logError("Error verifying token in session cookie:", err); 
      return res.sendStatus(403);
    }

    if (data.userId) {
      logInfo("User authenticated successfully. User ID:", data.userId); 
      req.userId = data.userId;
      next();
    }
  });
};