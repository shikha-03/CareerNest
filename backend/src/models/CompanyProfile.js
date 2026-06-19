import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    companyName: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    website: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    location: { type: String, default: "" },
    industry: { type: String, default: "" },
    companySize: { type: String, default: "" },
    teamMembers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["owner", "admin", "recruiter"], default: "recruiter" },
        invitedEmail: String,
        status: { type: String, enum: ["pending", "active"], default: "pending" }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("CompanyProfile", companyProfileSchema);
