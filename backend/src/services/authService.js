import bcrypt from "bcryptjs";
import crypto from "crypto";
import CandidateProfile from "../models/CandidateProfile.js";
import CompanyProfile from "../models/CompanyProfile.js";
import PendingSignup from "../models/PendingSignup.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { hashToken, randomToken, signToken } from "../utils/tokens.js";
import { sendEmail } from "../utils/email.js";
import { assertEmailFormat, hasMxRecords } from "../utils/emailValidation.js";

const DEFAULT_AVATAR = "/uploads/profile/default-avatar.svg";

export function hashSignupOtp(otp) {
  return crypto.createHash("sha256").update(`${otp}:${process.env.JWT_SECRET}`).digest("hex");
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function getProfileForUser(user) {
  if (user.role === "candidate") {
    return CandidateProfile.findOne({ user: user._id });
  }
  if (user.role === "employer") {
    return CompanyProfile.findOne({ owner: user._id });
  }
  return null;
}

async function authPayload(user) {
  const profile = await getProfileForUser(user);
  return {
    token: signToken(user),
    user: {
      ...user.toJSON(),
      avatarUrl: user.avatar || DEFAULT_AVATAR
    },
    profile
  };
}

async function createVerifiedUserFromPending(pending) {
  const exists = await User.findOne({ email: pending.email });
  if (exists) throw new ApiError("Email is already registered", 409);

  const user = new User({
    name: pending.name,
    email: pending.email,
    password: pending.passwordHash,
    role: pending.role,
    isEmailVerified: true
  });
  user.$locals.skipPasswordHash = true;
  await user.save();

  if (user.role === "candidate") {
    await CandidateProfile.create({ user: user._id });
  } else if (user.role === "employer") {
    await CompanyProfile.create({ owner: user._id, companyName: pending.companyName || `${user.name}'s Company` });
  }

  await PendingSignup.deleteOne({ _id: pending._id });
  return user;
}

export async function sendSignupOtp({ name, email, password, role = "candidate", companyName }) {
  if (!assertEmailFormat(email)) throw new ApiError("Invalid email format", 422);
  if (!(await hasMxRecords(email))) throw new ApiError("Email domain does not accept mail", 422);

  const exists = await User.findOne({ email });
  if (exists) throw new ApiError("Email is already registered", 409);

  const otp = generateOtp();
  const passwordHash = await bcrypt.hash(password, 12);

  await PendingSignup.findOneAndUpdate(
    { email },
    {
      name,
      email,
      passwordHash,
      role,
      companyName,
      otpHash: hashSignupOtp(otp),
      otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
      attempts: 0
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  try {
    await sendEmail({
      to: email,
      subject: "Your CareerNest signup OTP",
      requireDelivery: true,
      html: `<p>Your CareerNest verification OTP is <strong>${otp}</strong>.</p><p>This code expires in 5 minutes.</p>`
    });
  } catch (error) {
    await PendingSignup.deleteOne({ email });
    throw new ApiError(`OTP email could not be delivered: ${error.message}`, 502);
  }

  return { email, expiresInMinutes: 5 };
}

export async function verifySignupOtp({ email, otp }) {
  const pending = await PendingSignup.findOne({ email }).select("+passwordHash");
  if (!pending) throw new ApiError("No pending signup found for this email", 404);
  if (pending.otpExpiresAt < new Date()) {
    await PendingSignup.deleteOne({ _id: pending._id });
    throw new ApiError("OTP has expired. Please request a new one.", 400);
  }

  pending.attempts += 1;
  await pending.save();
  if (pending.attempts > 5) {
    await PendingSignup.deleteOne({ _id: pending._id });
    throw new ApiError("Too many OTP attempts. Please restart signup.", 429);
  }

  if (pending.otpHash !== hashSignupOtp(String(otp))) {
    throw new ApiError("Invalid OTP", 400);
  }

  const user = await createVerifiedUserFromPending(pending);
  return authPayload(user);
}

export async function signup(payload) {
  return sendSignupOtp(payload);
}

export async function requestLegacyEmailVerification({ email }) {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError("User not found", 404);
  if (user.isEmailVerified) return user;

  const { rawToken, hashedToken } = randomToken();
  user.emailVerificationToken = hashedToken;
  await user.save({ validateBeforeSave: false });

  const verifyUrl = `${process.env.FRONTEND_URL}/email-verified?token=${rawToken}`;
  await sendEmail({
    to: user.email,
    subject: "Verify your CareerNest email",
    html: `<p>Welcome to CareerNest. Verify your email here: <a href="${verifyUrl}">${verifyUrl}</a></p>`
  });

  return user;
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError("Invalid email or password", 401);
  }

  return authPayload(user);
}

export async function verifyEmail(token) {
  const user = await User.findOne({ emailVerificationToken: hashToken(token) }).select("+emailVerificationToken");
  if (!user) throw new ApiError("Invalid verification token", 400);

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();
  return user;
}

export async function forgotPassword(email) {
  const user = await User.findOne({ email }).select("+passwordResetToken +passwordResetExpires");
  if (!user) return;

  const { rawToken, hashedToken } = randomToken();
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
  await sendEmail({
    to: user.email,
    subject: "Reset your CareerNest password",
    html: `<p>Reset your password here: <a href="${resetUrl}">${resetUrl}</a></p>`
  });
}

export async function resetPassword(token, password) {
  const user = await User.findOne({
    passwordResetToken: hashToken(token),
    passwordResetExpires: { $gt: Date.now() }
  }).select("+passwordResetToken +passwordResetExpires");

  if (!user) throw new ApiError("Invalid or expired reset token", 400);

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return authPayload(user);
}
