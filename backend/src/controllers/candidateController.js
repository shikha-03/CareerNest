import Application from "../models/Application.js";
import CandidateProfile from "../models/CandidateProfile.js";
import Job from "../models/Job.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { createNotification } from "../services/notificationService.js";

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await CandidateProfile.findOne({ user: req.user._id }).populate("savedJobs");
  sendSuccess(res, "Candidate profile fetched", { profile });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await CandidateProfile.findOneAndUpdate({ user: req.user._id }, req.body, { new: true, upsert: true });
  sendSuccess(res, "Candidate profile updated", { profile });
});

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError("Resume file is required", 400);
  const resumeUrl = `/uploads/${req.file.filename}`;
  const profile = await CandidateProfile.findOneAndUpdate({ user: req.user._id }, { resumeUrl }, { new: true, upsert: true });
  sendSuccess(res, "Resume uploaded", { resumeUrl, profile });
});

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ candidate: req.user._id }).populate({ path: "job", populate: "company" }).sort("-createdAt");
  sendSuccess(res, "Applications fetched", { applications });
});

export const saveJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) throw new ApiError("Job not found", 404);
  const profile = await CandidateProfile.findOneAndUpdate(
    { user: req.user._id },
    { $addToSet: { savedJobs: job._id } },
    { new: true, upsert: true }
  ).populate("savedJobs");
  sendSuccess(res, "Job saved", { profile });
});

export const unsaveJob = asyncHandler(async (req, res) => {
  const profile = await CandidateProfile.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { savedJobs: req.params.jobId } },
    { new: true }
  ).populate("savedJobs");
  sendSuccess(res, "Job removed from saved jobs", { profile });
});

export const getSavedJobs = asyncHandler(async (req, res) => {
  const profile = await CandidateProfile.findOne({ user: req.user._id }).populate("savedJobs");
  sendSuccess(res, "Saved jobs fetched", { savedJobs: profile?.savedJobs || [] });
});

export const applyJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job || job.status !== "active") throw new ApiError("Active job not found", 404);

  const profile = await CandidateProfile.findOne({ user: req.user._id });
  const application = await Application.create({
    job: job._id,
    candidate: req.user._id,
    employer: job.employer,
    resumeUrl: req.body.resumeUrl || profile?.resumeUrl,
    coverLetter: req.body.coverLetter
  });

  job.applicantsCount += 1;
  await job.save();

  await createNotification({
    user: job.employer,
    title: "New application",
    message: `${req.user.name} applied for ${job.title}.`,
    type: "application",
    relatedEntity: { entityType: "Application", entityId: application._id }
  });

  sendSuccess(res, "Application submitted", { application }, 201);
});
