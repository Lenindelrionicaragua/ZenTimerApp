import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validateAllowedFields from "../util/validateAllowedFields.js";
import { logInfo } from "../util/logging.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  dateOfBirth: { type: String, required: true, trim: true },
});

export const validateUser = (
  userObject,
  requirePassword = true,
  requireName = true,
  requireEmail = true,
  requireDateOfBirth = true
) => {
  const errorList = [];
  const allowedKeys = ["name", "email", "password", "dateOfBirth"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (requireName && userObject.name == null || userObject.name == "") {
    errorList.push("name is a required field");
    logInfo("user Create Validation failed: Name is required field");
  }

  if (requireName && !/^[a-zA-Z0-9]+$/.test(userObject.name)) {
    errorList.push("name can only contain letters and numbers, with no spaces");
    logInfo("user Create Validation failed: Name can only contain letters and numbers, with no spaces");
  }

  if (requireEmail && userObject.email == null) {
    errorList.push("email is a required field");
    logInfo("User create Validation failed: Email is required field");
  }

  if (requirePassword && userObject.password == null) {
    errorList.push("password is a required field");
    logInfo("User create Validation failed: Password is required field");
  }
  
  if (requireDateOfBirth && userObject.dateOfBirth == null) {
    errorList.push("Date Of Birth is a required field");
    logInfo("User create Validation failed: Date Of Birth is required field");
  }

  return errorList;
};

userSchema.pre("save", async function (next) {
  // Hash the password before saving to the database
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      // Log to verify that the password is hashed successfully
      logInfo(`Password hashed successfully for user: ${this.email}`);

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.model("user", userSchema);

export default User;