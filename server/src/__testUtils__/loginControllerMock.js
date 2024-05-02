import { logInfo } from "../../../server/src/util/logging.js";
import validationErrorMessage from "../../../server/src/util/validationErrorMessage.js";
import jwt from "jsonwebtoken";

const users = [
  {
    _id: "1",
    name: "Jane",
    email: "jane@example.com",
    password: "password123",
  },
  {
    _id: "2",
    name: "John",
    email: "john@example.com",
    password: "password123",
  },
];

export const loginMock = async (req, res) => {
  // Check if the request body contains user information
  if (!req.body || typeof req.body !== "object" || !req.body.user) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid request body" });
  }

  const { email, password, ...additionalFields } = req.body.user;

  logInfo("test is calling to the loginControllerMock");

  try {
    // Validation Errors
    const errors = [];
    if (!email || !password) {
      errors.push("Email and password are required.");
    }

    if (Object.keys(additionalFields).length > 0) {
      errors.push("Invalid fields present in the request.");
    }

    if (errors.length > 0) {
      const errorMessage = validationErrorMessage(errors);
      res.status(400).json({ success: false, error: errorMessage });
      return;
    }

    const userFound = users.find((u) => u.email === email);

    if (userFound) {
      logInfo(`User found: ${JSON.stringify(userFound)}`);

      if (password === userFound.password) {
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
        res
          .status(401)
          .json({
            success: false,
            msg: "The password provided is incorrect. Please verify your password and try again.",
          });
      }
    } else {
      logInfo("User not found in loginControllerMock");
      res
        .status(401)
        .json({
          success: false,
          msg: "No user was found associated with the provided email address. Please verify your email and try again or register if you are a new user.",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        msg: "An internal server error occurred. Please try again later or contact technical support if the issue persists.",
      });
  }
};
