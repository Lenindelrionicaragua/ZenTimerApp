import { validateUser } from "../../models/userModels";

describe("validateUser function", () => {
//   test("should return an empty array if all required fields are provided", () => {
//     const user = {
//       name: "John Doe",
//       email: "john@example.com",
//       password: "Password123",
//       dateOfBirth: "1990-01-01",
//     };

//     const errors = validateUser(user);
    
//     expect(errors).toHaveLength(0);
//   });

//   test("should return an error messages if the name is null", () => {
//     const user = {
//               name: null,
//               email: "john@example.com",
//               password: "Password123",
//               dateOfBirth: "1990-01-01",
//             };

//     const errors = validateUser(user);
    
//     expect(errors).toHaveLength(1);
//     expect(errors).toContainEqual("Name is a required field");
//   });

//   test("should return an error messages if the name is and empty field", () => {
//     const user = {
//               name: "",
//               email: "john@example.com",
//               password: "Password123",
//               dateOfBirth: "1990-01-01",
//             };

//     const errors = validateUser(user);
    
//     expect(errors).toHaveLength(1);
//     expect(errors).toContainEqual("Name is a required field");
//   });

test("should return error messages if the name contains invalid characters or invalid spaces", () => {
    const userSpaceStart = {
        name: " John Carlos",
        email: "john@example.com",
        password: "Password123",
        dateOfBirth: "1990-01-01",
    };

    const userSpaceEnd = {
        name: "John Carlos ",
        email: "john@example.com",
        password: "Password123",
        dateOfBirth: "1990-01-01",
    };

    const userInvalidCharacter = {
        name: "John!",
        email: "john@example.com",
        password: "Password123",
        dateOfBirth: "1990-01-01",
    };

    const userInvalidCharacter2 = {
        name: "John@",
        email: "john@example.com",
        password: "Password123",
        dateOfBirth: "1990-01-01",
    };

    const errors1 = validateUser(userSpaceStart);
    const errors2 = validateUser(userSpaceEnd);
    const errors3 = validateUser(userInvalidCharacter);
    const errors4 = validateUser(userInvalidCharacter2);

    expect(errors1).toHaveLength(1);
    expect(errors2).toHaveLength(1);
    expect(errors3).toHaveLength(1);
    expect(errors4).toHaveLength(1);

    expect(errors1).toContainEqual("Name can only contain letters, numbers, and a single space between words");
    expect(errors2).toContainEqual("Name can only contain letters, numbers, and a single space between words");
    expect(errors3).toContainEqual("Name can only contain letters, numbers, and a single space between words");
    expect(errors4).toContainEqual("Name can only contain letters, numbers, and a single space between words");
});


//   test("Should return an error message if the name contains invalid symbols", () => {
//     const user = {
//               name: "Anne!$",
//               email: "john@example.com",
//               password: "Password123",
//               dateOfBirth: "1990-01-01",
//             };

//     const errors = validateUser(user);
   
//     expect(errors).toHaveLength(1);
//     expect(errors).toContainEqual("Name can only contain letters and numbers, with no spaces");
//   });

//   test("should return an error messages if the email is null", () => {
//     const user = {
//               name: "Anne",
//               email: null,
//               password: "Password123",
//               dateOfBirth: "1990-01-01",
//             };

//     const errors = validateUser(user);
    
//     expect(errors).toHaveLength(1);
//     expect(errors).toContainEqual("Email is a required field");
//   });

//   test("should return an error messages if the email is not in a valid format", () => {
//     const user = {
//               name: "Anne",
//               email: "johnexample.com",
//               password: "Password123",
//               dateOfBirth: "1990-01-01",
//             };

//     const errors = validateUser(user);
   
//     expect(errors).toHaveLength(2);
//     expect(errors).toContainEqual("Email is a required field");
//     expect(errors).toContainEqual("Name can only contain letters and numbers, with no spaces");
//   });

//   test("Should return an error message if the name contains invalid symbols", () => {
//     const user = {
//               name: "Anne!$",
//               email: "john@example.com",
//               password: "Password123",
//               dateOfBirth: "1990-01-01",
//             };

//     const errors = validateUser(user);
   
//     expect(errors).toHaveLength(1);
//     expect(errors).toContainEqual("name can only contain letters and numbers, with no spaces");
//   });

  

//    test("should return an array with error messages if required fields are missing", () => {
//     const user = {};

//     const errors = validateUser(user);
    
//     expect(errors).toHaveLength(4);
//     expect(errors).toContain("name is a required field");
//     expect(errors).toContain("email is a required field");
//     expect(errors).toContain("password is a required field");
//     expect(errors).toContain("Date Of Birth is a required field");
//   });

//   test("should return an array with error messages if invalid fields are provided", () => {
//     const user = {
//       name: "Mary!!!@#$",
//       email: "invalidemail",
//       password: "weakpassword",
//       dateOfBirth: "2022-02-30",
//       invalidField: "invalid",
//     };

//     const errors = validateUser(user);
    
//     expect(errors).toHaveLength(5);
//     expect(errors).toContain("name contains invalid characters in the username.");
//     expect(errors).toContain("invalidemail is not a valid email address.");
//     expect(errors).toContain("The password must be at least 8 characters long, including at least one digit, one uppercase letter, one lowercase letter, and one special character.");
//     expect(errors).toContain("Date Of Birth is a required field");
//     expect(errors).toContain("invalidField is not allowed.");
//   });
});
