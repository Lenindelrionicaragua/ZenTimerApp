import { logInfo } from "../../util/logging.js";
import validationErrorMessage from "../../util/validationErrorMessage.js";
import User from "../../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
 // Check if the request body contains user information
 if (!req.body || typeof req.body !== "object" || !req.body.user) {
  return res.status(400).json({ success: false, msg: "Invalid request body" }); // Update error message here
 } 

  const { user } = req.body;
   
  // Validation Errors

  try {
    const errors = [];
    if (!user.email || !user.password) {
      errors.push("Email and password are required.");
    }

    if (errors.length > 0) {
      const errorMessage = validationErrorMessage(errors);
      res.status(400).json({ success: false, error: errorMessage });
      return;
    }
    
    // Continue with the login process if there are no validation errors
    const userFound = await User.findOne({ email: user.email });

    logInfo(`User does not exist`);

    if (userFound) {
      logInfo(`User found: ${JSON.stringify(userFound)}`);

      const isPasswordValid = await bcrypt.compare(
        user.password,
        userFound.password
      );

      // After the comparison
      logInfo(`Is password valid? ${isPasswordValid}`);

      if (isPasswordValid) {
        logInfo(`Password is valid for user: ${userFound.email}`);
        // Create jwt token
        const token = jwt.sign(
          { userId: userFound._id.toString() },
         process.env.JWT_SECRET 
        );

        // Save token in cookie
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
      res.status(401).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};