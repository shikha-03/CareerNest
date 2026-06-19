import Application from "../models/Application.js";
import CandidateProfile from "../models/CandidateProfile.js";
import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const candidateAnalytics = asyncHandler(async (req, res) => {
  const [applications, profile] = await Promise.all([
    Application.countDocuments({ candidate: req.user._id }),
    CandidateProfile.findOne({ user: req.user._id })
  ]);
  sendSuccess(res, "Candidate analytics fetched", {
    profileViews: 0,
    applications,
    savedJobs: profile?.savedJobs?.length || 0
  });
});

export const employerAnalytics = asyncHandler(async (req, res) => {
  const [openJobs, totalApplicants, interviews] = await Promise.all([
    Job.countDocuments({ employer: req.user._id, status: "active" }),
    Application.countDocuments({ employer: req.user._id }),
    Application.countDocuments({ employer: req.user._id, status: "interview" })
  ]);
  sendSuccess(res, "Employer analytics fetched", { openJobs, totalApplicants, interviews });
});
