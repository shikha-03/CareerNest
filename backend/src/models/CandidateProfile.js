import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    headline: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    skills: [{ type: String, trim: true }],
    experience: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String
      }
    ],
    education: [
      {
        school: String,
        degree: String,
        startDate: Date,
        endDate: Date
      }
    ],
    resumeUrl: { type: String, default: "" },
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("CandidateProfile", candidateProfileSchema);
