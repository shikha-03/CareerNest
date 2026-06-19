import ApiError from "../utils/ApiError.js";

export function notFound(req, _res, next) {
  next(new ApiError(`Route not found: ${req.originalUrl}`, 404));
}

export function errorHandler(err, _req, res, _next) {
  let error = err;

  if (err.name === "CastError") error = new ApiError("Resource not found", 404);
  if (err.code === 11000) error = new ApiError("Duplicate field value", 409, err.keyValue);
  if (err.name === "ValidationError") {
    error = new ApiError("Validation failed", 422, Object.values(err.errors).map((item) => item.message));
  }
  if (err.name === "JsonWebTokenError") error = new ApiError("Invalid token", 401);
  if (err.name === "TokenExpiredError") error = new ApiError("Token expired", 401);

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
    errors: error.errors || []
  });
}
