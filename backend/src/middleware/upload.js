import multer from "multer";
import fs from "fs";
import path from "path";
import ApiError from "../utils/ApiError.js";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync("uploads", { recursive: true });
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

const profilePhotoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync("uploads/profile", { recursive: true });
    cb(null, "uploads/profile/");
  },
  filename: (req, file, cb) => {
    const unique = `${req.user._id}-${Date.now()}`;
    cb(null, `${unique}${path.extname(file.originalname).toLowerCase()}`);
  }
});

function fileFilter(_req, file, cb) {
  const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.mimetype)) return cb(new ApiError("Unsupported file type", 400), false);
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

export const uploadProfilePhoto = multer({
  storage: profilePhotoStorage,
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.mimetype)) return cb(new ApiError("Only jpg, jpeg, and png images are supported", 400), false);
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }
});
