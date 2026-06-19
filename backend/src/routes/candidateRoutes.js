import { Router } from "express";
import * as candidateController from "../controllers/candidateController.js";
import { authorize, protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.use(protect, authorize("candidate"));

router.get("/profile", candidateController.getProfile);
router.put("/profile", candidateController.updateProfile);
router.post("/upload-resume", upload.single("resume"), candidateController.uploadResume);
router.get("/applications", candidateController.getApplications);
router.post("/jobs/:jobId/save", candidateController.saveJob);
router.delete("/jobs/:jobId/save", candidateController.unsaveJob);
router.get("/saved-jobs", candidateController.getSavedJobs);
router.post("/jobs/:jobId/apply", candidateController.applyJob);

export default router;
