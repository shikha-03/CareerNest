import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

export default function validate(req, _res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new ApiError("Validation failed", 422, result.array());
  }
  next();
}
