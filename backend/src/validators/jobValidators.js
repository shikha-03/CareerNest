import { body } from "express-validator";

export const createJobRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("jobType").optional().isIn(["full-time", "part-time", "contract", "internship", "hybrid", "remote"]),
  body("experienceLevel").optional().isIn(["entry", "mid", "senior", "lead"])
];

export const applicationStatusRules = [
  body("status").isIn(["applied", "reviewed", "shortlisted", "interview", "rejected", "hired"]).withMessage("Invalid status")
];
