import CompanyProfile from "../models/CompanyProfile.js";
import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const getJobs = asyncHandler(async (req, res) => {
  const { search, location, jobType, experienceLevel } = req.query;
  const filter = { status: "active" };
  if (jobType) filter.jobType = jobType;
  if (experienceLevel) filter.experienceLevel = experienceLevel;
  if (location) filter.location = new RegExp(location, "i");
  if (search) {
    filter.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { skills: new RegExp(search, "i") }
    ];
  }

  const jobs = await Job.find(filter).populate("company").sort("-createdAt");
  sendSuccess(res, "Jobs fetched", { jobs });
});

export const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("company").populate("employer", "name email");
  sendSuccess(res, "Job fetched", { job });
});

export const getCompanies = asyncHandler(async (_req, res) => {
  const companies = await CompanyProfile.find().populate("owner", "name email");
  sendSuccess(res, "Companies fetched", { companies });
});

export const getCompany = asyncHandler(async (req, res) => {
  const company = await CompanyProfile.findById(req.params.id).populate("owner", "name email");
  const jobs = await Job.find({ company: req.params.id, status: "active" });
  sendSuccess(res, "Company fetched", { company, jobs });
});
