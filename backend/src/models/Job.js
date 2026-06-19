import mongoose from "mongoose";
import slugify from "slugify";

const jobSchema = new mongoose.Schema(
  {
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "CompanyProfile", required: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, index: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ["full-time", "part-time", "contract", "internship", "hybrid", "remote"], default: "full-time" },
    salaryMin: { type: Number, default: 0 },
    salaryMax: { type: Number, default: 0 },
    skills: [{ type: String, trim: true }],
    experienceLevel: { type: String, enum: ["entry", "mid", "senior", "lead"], default: "mid" },
    status: { type: String, enum: ["active", "closed", "draft"], default: "active" },
    applicantsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

jobSchema.pre("save", function buildSlug(next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Job", jobSchema);
