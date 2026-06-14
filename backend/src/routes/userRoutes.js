import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { uploadProfilePhoto } from "../middleware/upload.js";

const router = Router();

router.post("/upload-profile-photo", protect, uploadProfilePhoto.single("photo"), userController.uploadProfilePhoto);

export default router;
