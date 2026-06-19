import { Router } from "express";
import * as employerController from "../controllers/employerController.js";
import { authorize, protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import validate from "../middleware/validate.js";
import { applicationStatusRules, createJobRules } from "../validators/jobValidators.js";

const router = Router();

router.use(protect, authorize("employer"));

router.get("/company", employerController.getCompany);
router.put("/company", employerController.updateCompany);
router.post("/upload-logo", upload.single("logo"), employerController.uploadLogo);
router.post("/jobs", createJobRules, validate, employerController.createJob);
router.get("/jobs", employerController.getEmployerJobs);
router.get("/jobs/:jobId/applicants", employerController.getJobApplicants);
router.patch("/applications/:applicationId/status", applicationStatusRules, validate, employerController.updateApplicationStatus);
router.get("/applicants", employerController.getApplicants);
router.get("/candidates/:candidateId", employerController.getCandidate);
router.get("/team", employerController.getTeam);
router.post("/team/invite", employerController.inviteTeamMember);

export default router;
