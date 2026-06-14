import Application from "../models/Application.js";
import CandidateProfile from "../models/CandidateProfile.js";
import CompanyProfile from "../models/CompanyProfile.js";
import Job from "../models/Job.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { createNotification } from "../services/notificationService.js";
import { emitApplicationUpdate, emitToUser } from "../socket/index.js";

export const getCompany = asyncHandler(async (req, res) => {
  const company = await CompanyProfile.findOne({ owner: req.user._id }).populate("teamMembers.user", "name email role");
  sendSuccess(res, "Company profile fetched", { company });
});

export const updateCompany = asyncHandler(async (req, res) => {
  const company = await CompanyProfile.findOneAndUpdate({ owner: req.user._id }, req.body, { new: true, upsert: true });
  sendSuccess(res, "Company profile updated", { company });
});

export const uploadLogo = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError("Logo file is required", 400);
  const logoUrl = `/uploads/${req.file.filename}`;
  const company = await CompanyProfile.findOneAndUpdate({ owner: req.user._id }, { logoUrl }, { new: true, upsert: true });
  sendSuccess(res, "Logo uploaded", { logoUrl, company });
});

export const createJob = asyncHandler(async (req, res) => {
  const company = await CompanyProfile.findOne({ owner: req.user._id });
  if (!company) throw new ApiError("Create a company profile before posting jobs", 400);

  const job = await Job.create({ ...req.body, employer: req.user._id, company: company._id });
  sendSuccess(res, "Job posted", { job }, 201);
});

export const getEmployerJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ employer: req.user._id }).populate("company").sort("-createdAt");
  sendSuccess(res, "Employer jobs fetched", { jobs });
});

export const getJobApplicants = asyncHandler(async (req, res) => {
  const applications = await Application.find({ employer: req.user._id, job: req.params.jobId })
    .populate("candidate", "name email avatar")
    .populate("job", "title");
  sendSuccess(res, "Applicants fetched", { applications });
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findOneAndUpdate(
    { _id: req.params.applicationId, employer: req.user._id },
    { status: req.body.status },
    { new: true }
  ).populate("job", "title");
  if (!application) throw new ApiError("Application not found", 404);

  await createNotification({
    user: application.candidate,
    title: "Application updated",
    message: `Your application for ${application.job.title} is now ${application.status}.`,
    type: "application",
    relatedEntity: { entityType: "Application", entityId: application._id }
  });

  emitApplicationUpdate(application._id.toString(), application);
  emitToUser(application.candidate.toString(), "application:status", application);

  sendSuccess(res, "Application status updated", { application });
});

export const getApplicants = asyncHandler(async (req, res) => {
  const applications = await Application.find({ employer: req.user._id }).populate("candidate", "name email avatar").populate("job", "title");
  sendSuccess(res, "Applicants fetched", { applications });
});

export const getCandidate = asyncHandler(async (req, res) => {
  const profile = await CandidateProfile.findOne({ user: req.params.candidateId }).populate("user", "name email avatar");
  if (!profile) throw new ApiError("Candidate profile not found", 404);
  sendSuccess(res, "Candidate profile fetched", { profile });
});

export const getTeam = asyncHandler(async (req, res) => {
  const company = await CompanyProfile.findOne({ owner: req.user._id }).populate("teamMembers.user", "name email role");
  sendSuccess(res, "Team fetched", { team: company?.teamMembers || [] });
});

export const inviteTeamMember = asyncHandler(async (req, res) => {
  const company = await CompanyProfile.findOneAndUpdate(
    { owner: req.user._id },
    { $addToSet: { teamMembers: { invitedEmail: req.body.email, role: req.body.role || "recruiter" } } },
    { new: true }
  );
  sendSuccess(res, "Team invite recorded", { company });
});
