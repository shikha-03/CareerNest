import { Router } from "express";
import * as analyticsController from "../controllers/analyticsController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = Router();

router.get("/candidate", protect, authorize("candidate"), analyticsController.candidateAnalytics);
router.get("/employer", protect, authorize("employer"), analyticsController.employerAnalytics);

export default router;
