import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validateAllowedFields from "../util/validateAllowedFields.js";
import { logInfo } from "../util/logging.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Validate that the name does not contain special characters
        return /^[a-zA-Z0-9 ]*$/.test(v);
      },
      message: props => `${props.value} contains invalid characters in the username.`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Validate email format
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email address.`
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Validate that the password contains at least one digit, one uppercase letter, one lowercase letter, and one special character
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/.test(v);
      },
      message: props => `The password must be at least 8 characters long, including at least one digit, one uppercase letter, one lowercase letter, and one special character.`
    }
  },
  dateOfBirth: { type: String, required: true, trim: true },
});


// Signup validation.
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

  if (requireName && userObject.name == null) {
    errorList.push("name is a required field");
    logInfo("user Create Validation failed: Name is required");
  }

  if (requireEmail && userObject.email == null) {
    errorList.push("email is a required field");
    logInfo("User create Validation failed: Email is required");
  }

  if (requirePassword && userObject.password == null) {
    errorList.push("password is a required field");
    logInfo("User create Validation failed: Password is required");
  }
  if (requireDateOfBirth && userObject.dateOfBirth == null) {
    errorList.push("Date Of Birth is a required field");
    logInfo("User create Validation failed: Date Of Birth is required");
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