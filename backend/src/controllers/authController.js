import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import * as authService from "../services/authService.js";

function setTokenCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

export const signup = asyncHandler(async (req, res) => {
  const data = await authService.sendSignupOtp(req.body);
  sendSuccess(res, "Signup OTP sent. Verify OTP to create your account.", data, 202);
});

export const sendSignupOtp = asyncHandler(async (req, res) => {
  const data = await authService.sendSignupOtp(req.body);
  sendSuccess(res, "Signup OTP sent. Verify OTP to create your account.", data, 202);
});

export const verifySignupOtp = asyncHandler(async (req, res) => {
  const data = await authService.verifySignupOtp(req.body);
  setTokenCookie(res, data.token);
  sendSuccess(res, "Email verified and account created successfully", data, 201);
});

export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  setTokenCookie(res, data.token);
  sendSuccess(res, "Login successful", data);
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie("token");
  sendSuccess(res, "Logout successful");
});

export const me = asyncHandler(async (req, res) => {
  sendSuccess(res, "Authenticated user fetched", { user: req.user });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const user = await authService.verifyEmail(req.params.token);
  sendSuccess(res, "Email verified successfully", { user });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  sendSuccess(res, "If that email exists, a reset link has been sent.");
});

export const resetPassword = asyncHandler(async (req, res) => {
  const data = await authService.resetPassword(req.params.token, req.body.password);
  setTokenCookie(res, data.token);
  sendSuccess(res, "Password reset successful", data);
});
