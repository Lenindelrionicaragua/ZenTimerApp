import { logInfo } from "../../../server/src/util/logging.js";
import validationErrorMessage from "../../../server/src/util/validationErrorMessage.js";
import jwt from "jsonwebtoken";

const users = [
  {
    _id: "1",
    name: "Jane",
    email: "jane@example.com",
    password: "password123" 
  },
  {
    _id: "2",
    name: "John",
    email: "john@example.com",
    password: "password123" 
  }
];

export const loginMock = async (req, res) => {
  const { user } = req.body;

  logInfo(`test is calling to the loginControllerMock`);

  try {
    // Validation Errors
    const errors = [];
    if (!user.email || !user.password) {
      errors.push("Email and password are required.");
    }

    if (errors.length > 0) {
      const errorMessage = validationErrorMessage(errors);
      res.status(400).json({ success: false, error: errorMessage });
      return;
    }

    const userFound = users.find(u => u.email === user.email);

    if (userFound) {
      logInfo(`User found: ${JSON.stringify(userFound)}`);

      if (user.password === userFound.password) {
        logInfo(`Password is valid for user: ${userFound.email}`);
        const token = jwt.sign(
          { userId: userFound._id.toString() },
          process.env.JWT_SECRET
        );

        res.cookie("session", token, {
          maxAge: 86400000,
          httpOnly: true,
          sameSite: "lax",
        });

        res.status(200).json({
          success: true,
          msg: "Login successful",
          token,
          user: {
            id: userFound._id,
            email: userFound.email,
            name: userFound.name,
          },
        });
      } else {
        res.status(401).json({ success: false, msg: "Incorrect password" });
      }
    } else {
      logInfo(`User not found in loginControllerMock`);
      res.status(401).json({ success: false, msg: "User not found" }); 
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
