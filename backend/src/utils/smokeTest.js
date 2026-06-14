import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import PendingSignup from "../models/PendingSignup.js";
import User from "../models/User.js";
import { hashSignupOtp } from "../services/authService.js";
import { hashToken } from "./tokens.js";

const API = process.env.API_BASE_URL || "http://localhost:5000";

async function request(method, path, { token, body, expected = [200, 201] } = {}) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!expected.includes(response.status)) {
    throw new Error(`${method} ${path} failed with ${response.status}: ${text}`);
  }

  return data;
}

async function uploadFile(path, fieldName, filename, content, token) {
  const form = new FormData();
  form.append(fieldName, new Blob([content], { type: filename.endsWith(".pdf") ? "application/pdf" : "image/png" }), filename);

  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form
  });

  const text = await response.text();
  if (!response.ok) throw new Error(`POST ${path} failed with ${response.status}: ${text}`);
  return JSON.parse(text);
}

async function login(email) {
  const data = await request("POST", "/api/auth/login", {
    body: { email, password: "Password123" }
  });
  return data.data.token;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const results = [];
  const ok = (name) => results.push({ name, status: "PASS" });

  await request("GET", "/health");
  ok("GET /health");

  await request("GET", "/api/jobs");
  ok("GET /api/jobs");

  const companies = await request("GET", "/api/companies");
  ok("GET /api/companies");

  const companyId = companies.data.companies[0]?._id;
  if (companyId) {
    await request("GET", `/api/companies/${companyId}`);
    ok("GET /api/companies/:id");
  }

  const jobs = await request("GET", "/api/jobs");
  const jobId = jobs.data.jobs[0]?._id;
  if (jobId) {
    await request("GET", `/api/jobs/${jobId}`);
    ok("GET /api/jobs/:id");
  }

  await request("POST", "/api/auth/forgot-password", {
    body: { email: "candidate@careernest.com" }
  });
  ok("POST /api/auth/forgot-password");

  await request("POST", "/api/auth/send-signup-otp", {
    body: {
      name: "Invalid Email User",
      email: "fake@invalid-domain-for-careernest.test",
      password: "Password123",
      role: "candidate"
    },
    expected: [422]
  });
  ok("POST /api/auth/send-signup-otp rejects invalid MX");

  if (process.env.SMTP_HOST && process.env.SMOKE_TEST_EMAIL) {
    await request("POST", "/api/auth/send-signup-otp", {
      body: {
        name: "SMTP Smoke User",
        email: process.env.SMOKE_TEST_EMAIL,
        password: "Password123",
        role: "candidate"
      },
      expected: [202]
    });
    ok("POST /api/auth/send-signup-otp delivers OTP");
  }

  const smokeEmail = `smoke-${Date.now()}@careernest.com`;
  await PendingSignup.create({
    name: "Smoke Test User",
    email: smokeEmail,
    passwordHash: await bcrypt.hash("Password123", 12),
    role: "candidate",
    otpHash: hashSignupOtp("123456"),
    otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });
  await request("POST", "/api/auth/verify-signup-otp", {
    body: { email: smokeEmail, otp: "123456" },
    expected: [201]
  });
  ok("POST /api/auth/verify-signup-otp creates account");

  await User.findOneAndUpdate(
    { email: smokeEmail },
    {
      passwordResetToken: hashToken("smoke-reset-token"),
      passwordResetExpires: Date.now() + 30 * 60 * 1000
    }
  );
  await request("POST", "/api/auth/reset-password/smoke-reset-token", {
    body: { password: "Password456" }
  });
  ok("POST /api/auth/reset-password/:token");

  const candidateToken = await login("candidate@careernest.com");
  ok("POST /api/auth/login candidate");

  const employerToken = await login("employer@careernest.com");
  ok("POST /api/auth/login employer");

  await request("GET", "/api/auth/me", { token: candidateToken });
  ok("GET /api/auth/me");

  await uploadFile("/api/user/upload-profile-photo", "photo", "avatar.png", "CareerNest avatar smoke file", candidateToken);
  ok("POST /api/user/upload-profile-photo");

  await request("GET", "/api/candidate/profile", { token: candidateToken });
  ok("GET /api/candidate/profile");

  await request("PUT", "/api/candidate/profile", {
    token: candidateToken,
    body: { headline: "Senior Product Designer", location: "Remote" }
  });
  ok("PUT /api/candidate/profile");

  await uploadFile("/api/candidate/upload-resume", "resume", "resume.pdf", "%PDF-1.4 CareerNest smoke test", candidateToken);
  ok("POST /api/candidate/upload-resume");

  await request("GET", "/api/candidate/applications", { token: candidateToken });
  ok("GET /api/candidate/applications");

  if (jobId) {
    await request("POST", `/api/candidate/jobs/${jobId}/save`, { token: candidateToken });
    ok("POST /api/candidate/jobs/:jobId/save");

    await request("GET", "/api/candidate/saved-jobs", { token: candidateToken });
    ok("GET /api/candidate/saved-jobs");

    await request("DELETE", `/api/candidate/jobs/${jobId}/save`, { token: candidateToken });
    ok("DELETE /api/candidate/jobs/:jobId/save");

    await request("POST", `/api/candidate/jobs/${jobId}/apply`, {
      token: candidateToken,
      body: { coverLetter: "I am interested in this role." },
      expected: [201, 409]
    });
    ok("POST /api/candidate/jobs/:jobId/apply");
  }

  await request("GET", "/api/analytics/candidate", { token: candidateToken });
  ok("GET /api/analytics/candidate");

  await request("GET", "/api/notifications", { token: candidateToken });
  ok("GET /api/notifications");

  const candidateNotifications = await request("GET", "/api/notifications", { token: candidateToken });
  const notificationId = candidateNotifications.data.notifications[0]?._id;
  if (notificationId) {
    await request("PATCH", `/api/notifications/${notificationId}/read`, { token: candidateToken });
    ok("PATCH /api/notifications/:id/read");
  }

  await request("PATCH", "/api/notifications/read-all", { token: candidateToken });
  ok("PATCH /api/notifications/read-all");

  await request("GET", "/api/employer/company", { token: employerToken });
  ok("GET /api/employer/company");

  await request("PUT", "/api/employer/company", {
    token: employerToken,
    body: { companyName: "TechNova Labs", industry: "SaaS" }
  });
  ok("PUT /api/employer/company");

  await uploadFile("/api/employer/upload-logo", "logo", "logo.png", "CareerNest smoke logo", employerToken);
  ok("POST /api/employer/upload-logo");

  await request("POST", "/api/employer/jobs", {
    token: employerToken,
    body: {
      title: `Smoke Test Role ${Date.now()}`,
      description: "Temporary role created during API smoke testing.",
      location: "Remote",
      jobType: "remote",
      experienceLevel: "mid"
    }
  });
  ok("POST /api/employer/jobs");

  const employerJobs = await request("GET", "/api/employer/jobs", { token: employerToken });
  ok("GET /api/employer/jobs");

  const employerJobId = employerJobs.data.jobs[0]?._id;
  if (employerJobId) {
    await request("GET", `/api/employer/jobs/${employerJobId}/applicants`, { token: employerToken });
    ok("GET /api/employer/jobs/:jobId/applicants");
  }

  await request("GET", "/api/employer/applicants", { token: employerToken });
  ok("GET /api/employer/applicants");

  const applicants = await request("GET", "/api/employer/applicants", { token: employerToken });
  const application = applicants.data.applications[0];
  if (application?._id) {
    await request("PATCH", `/api/employer/applications/${application._id}/status`, {
      token: employerToken,
      body: { status: "reviewed" }
    });
    ok("PATCH /api/employer/applications/:applicationId/status");
  }

  const candidateId = application?.candidate?._id;
  if (candidateId) {
    await request("GET", `/api/employer/candidates/${candidateId}`, { token: employerToken });
    ok("GET /api/employer/candidates/:candidateId");
  }

  await request("GET", "/api/employer/team", { token: employerToken });
  ok("GET /api/employer/team");

  await request("POST", "/api/employer/team/invite", {
    token: employerToken,
    body: { email: `recruiter-${Date.now()}@careernest.com`, role: "recruiter" }
  });
  ok("POST /api/employer/team/invite");

  await request("GET", "/api/analytics/employer", { token: employerToken });
  ok("GET /api/analytics/employer");

  const employerNotifications = await request("GET", "/api/notifications", { token: employerToken });
  const employerNotificationId = employerNotifications.data.notifications[0]?._id;
  if (employerNotificationId) {
    await request("DELETE", `/api/notifications/${employerNotificationId}`, { token: employerToken });
    ok("DELETE /api/notifications/:id");
  }

  await request("POST", "/api/auth/logout");
  ok("POST /api/auth/logout");

  console.table(results);
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error(error.message);
  mongoose.disconnect().finally(() => process.exit(1));
});
