# CareerNest Backend

Production-style REST API for CareerNest, a job platform connecting candidates and employers.

## Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT auth
- bcrypt password hashing
- Nodemailer email utilities
- Multer local uploads
- Helmet, CORS, rate limiting, input sanitization

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Make sure MongoDB is running locally or update `MONGO_URI` in `.env`.


## API Base URL

```text
http://localhost:5000/api
```

Health check:

```http
GET /health
```

## Response Format

Success:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## Important Routes

Auth:

- `POST /api/auth/signup`
- `POST /api/auth/send-signup-otp`
- `POST /api/auth/verify-signup-otp`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/auth/verify-email/:token`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password/:token`

Jobs and companies:

- `GET /api/jobs`
- `GET /api/jobs/:id`
- `GET /api/companies`
- `GET /api/companies/:id`

Candidate:

- `GET /api/candidate/profile`
- `PUT /api/candidate/profile`
- `POST /api/candidate/upload-resume`
- `GET /api/candidate/applications`
- `POST /api/candidate/jobs/:jobId/save`
- `DELETE /api/candidate/jobs/:jobId/save`
- `GET /api/candidate/saved-jobs`
- `POST /api/candidate/jobs/:jobId/apply`

Employer:

- `GET /api/employer/company`
- `PUT /api/employer/company`
- `POST /api/employer/upload-logo`
- `POST /api/employer/jobs`
- `GET /api/employer/jobs`
- `GET /api/employer/jobs/:jobId/applicants`
- `PATCH /api/employer/applications/:applicationId/status`
- `GET /api/employer/applicants`
- `GET /api/employer/candidates/:candidateId`
- `GET /api/employer/team`
- `POST /api/employer/team/invite`

Notifications:

- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`
- `PATCH /api/notifications/read-all`
- `DELETE /api/notifications/:id`

Analytics:

- `GET /api/analytics/candidate`
- `GET /api/analytics/employer`

## Frontend Connection

In the React project, set:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```


The current frontend service already reads `VITE_API_BASE_URL` and attaches the token from local storage.

## Postman Testing Flow

1. `POST /api/auth/signup`
2. `POST /api/auth/login`
3. Copy `data.token`
4. Add Authorization header: `Bearer <token>`
5. Test role-specific routes:
   - Candidate token for `/api/candidate/*`
   - Employer token for `/api/employer/*`

## Notes

- If SMTP variables are empty, non-critical emails are skipped and logged.
- Signup OTP emails require SMTP configuration because account creation depends on real delivery acceptance.
- Production signup uses `/api/auth/send-signup-otp` and `/api/auth/verify-signup-otp`.
- User accounts are not created until OTP verification succeeds.
- Signup OTP is 6 digits, expires in 5 minutes, validates email format, checks DNS MX records, and requires SMTP delivery.
- Uploads are stored locally under `backend/uploads`.
- Cloudinary config is included for later upgrade, but local Multer is active by default.
