import { body } from "express-validator";

export const signupRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("role").optional().isIn(["candidate", "employer"]).withMessage("Invalid role")
];

export const verifySignupOtpRules = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("otp").isLength({ min: 6, max: 6 }).isNumeric().withMessage("OTP must be 6 digits")
];

export const loginRules = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required")
];

export const forgotPasswordRules = [body("email").isEmail().normalizeEmail().withMessage("Valid email is required")];
export const resetPasswordRules = [body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")];
