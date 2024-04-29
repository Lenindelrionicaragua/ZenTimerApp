import { validateUser } from "../../models/userModels.js";

describe("validateUser function", () => {
  test("should return an empty array if all required fields are provided", () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
      password: "Password123",
      dateOfBirth: "1990-01-01",
    };

    const errors = validateUser(user);
    
    expect(errors).toHaveLength(0);
  });

  test("should return an array with error messages if required fields are missing", () => {
    const user = {};

    const errors = validateUser(user);
    
    expect(errors).toHaveLength(4);
    expect(errors).toContain("name is a required field");
    expect(errors).toContain("email is a required field");
    expect(errors).toContain("passwo
