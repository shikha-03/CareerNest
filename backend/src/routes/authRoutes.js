import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import validate from "../middleware/validate.js";
import { forgotPasswordRules, loginRules, resetPasswordRules, signupRules, verifySignupOtpRules } from "../validators/authValidators.js";

const router = Router();

router.post("/signup", authLimiter, signupRules, validate, authController.signup);
router.post("/send-signup-otp", authLimiter, signupRules, validate, authController.sendSignupOtp);
router.post("/verify-signup-otp", authLimiter, verifySignupOtpRules, validate, authController.verifySignupOtp);
router.post("/login", authLimiter, loginRules, validate, authController.login);
router.post("/logout", authController.logout);
router.get("/me", protect, authController.me);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/forgot-password", authLimiter, forgotPasswordRules, validate, authController.forgotPassword);
router.post("/reset-password/:token", authLimiter, resetPasswordRules, validate, authController.resetPassword);

export default router;
