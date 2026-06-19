import { Router } from "express";
import * as jobController from "../controllers/jobController.js";

const router = Router();

router.get("/jobs", jobController.getJobs);
router.get("/jobs/:id", jobController.getJob);
router.get("/companies", jobController.getCompanies);
router.get("/companies/:id", jobController.getCompany);

export default router;
