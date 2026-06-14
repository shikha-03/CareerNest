import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Application from "../models/Application.js";
import CandidateProfile from "../models/CandidateProfile.js";
import ChatMessage from "../models/ChatMessage.js";
import CompanyProfile from "../models/CompanyProfile.js";
import Job from "../models/Job.js";
import Notification from "../models/Notification.js";
import PendingSignup from "../models/PendingSignup.js";
import User from "../models/User.js";

async function seed() {
  await connectDB();
  await Promise.all([
    Application.deleteMany(),
    CandidateProfile.deleteMany(),
    ChatMessage.deleteMany(),
    CompanyProfile.deleteMany(),
    Job.deleteMany(),
    Notification.deleteMany(),
    PendingSignup.deleteMany(),
    User.deleteMany()
  ]);

  const candidate = await User.create({
    name: "Alex Rivera",
    email: "candidate@careernest.com",
    password: "Password123",
    role: "candidate",
    isEmailVerified: true
  });

  const employer = await User.create({
    name: "Maya Thompson",
    email: "employer@careernest.com",
    password: "Password123",
    role: "employer",
    isEmailVerified: true
  });

  const candidateProfile = await CandidateProfile.create({
    user: candidate._id,
    headline: "Senior Product Designer",
    bio: "Product designer focused on SaaS workflows and design systems.",
    location: "Remote",
    skills: ["Figma", "Product Design", "Research"]
  });

  const company = await CompanyProfile.create({
    owner: employer._id,
    companyName: "TechNova Labs",
    description: "A modern SaaS company building hiring intelligence tools.",
    website: "https://technova.example",
    location: "San Francisco",
    industry: "SaaS",
    companySize: "51-200"
  });

  const jobs = await Job.create([
    {
      employer: employer._id,
      company: company._id,
      title: "Senior Product Designer",
      description: "Lead design for hiring intelligence workflows.",
      location: "Remote",
      jobType: "remote",
      salaryMin: 125000,
      salaryMax: 155000,
      skills: ["Figma", "SaaS", "Design Systems"],
      experienceLevel: "senior"
    },
    {
      employer: employer._id,
      company: company._id,
      title: "Frontend Engineer",
      description: "Build polished React dashboards.",
      location: "Bengaluru / Remote",
      jobType: "hybrid",
      salaryMin: 95000,
      salaryMax: 130000,
      skills: ["React", "Tailwind", "APIs"],
      experienceLevel: "mid"
    }
  ]);

  candidateProfile.savedJobs = [jobs[0]._id];
  await candidateProfile.save();

  await Notification.create({
    user: candidate._id,
    title: "Welcome to CareerNest",
    message: "Your candidate dashboard is ready.",
    type: "system"
  });

  console.log("Seed completed");
  await mongoose.connection.close();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
