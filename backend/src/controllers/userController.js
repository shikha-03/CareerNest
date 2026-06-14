import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const uploadProfilePhoto = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError("Profile photo is required", 400);

  req.user.avatar = `/uploads/profile/${req.file.filename}`;
  await req.user.save({ validateBeforeSave: false });

  sendSuccess(res, "Profile photo uploaded", {
    avatar: req.user.avatar,
    user: {
      ...req.user.toJSON(),
      avatarUrl: req.user.avatar
    }
  });
});
