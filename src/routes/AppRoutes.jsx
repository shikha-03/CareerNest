import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

const HomePage = lazy(() => import("../pages/public/HomePage"));
const JobsPage = lazy(() => import("../pages/public/JobsPage"));
const JobDetailsPage = lazy(() => import("../pages/public/JobDetailsPage"));
const CompaniesPage = lazy(() => import("../pages/public/CompaniesPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const SignupPage = lazy(() => import("../pages/auth/SignupPage"));
const VerifyEmailPage = lazy(() => import("../pages/auth/VerifyEmailPage"));
const EmailVerifiedPage = lazy(() => import("../pages/auth/EmailVerifiedPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/auth/ResetPasswordPage"));
const CandidateDashboard = lazy(() => import("../pages/candidate/CandidateDashboard"));
const CandidateApplications = lazy(() => import("../pages/candidate/CandidateApplications"));
const SavedJobs = lazy(() => import("../pages/candidate/SavedJobs"));
const CandidateSettings = lazy(() => import("../pages/candidate/CandidateSettings"));
const EmployerDashboard = lazy(() => import("../pages/employer/EmployerDashboard"));
const PostJob = lazy(() => import("../pages/employer/PostJob"));
const ApplicantsPage = lazy(() => import("../pages/employer/ApplicantsPage"));
const TeamManagement = lazy(() => import("../pages/employer/TeamManagement"));
const EmployerSettings = lazy(() => import("../pages/employer/EmployerSettings"));
const CandidateProfile = lazy(() => import("../pages/employer/CandidateProfile"));
const NotificationsPage = lazy(() => import("../pages/shared/NotificationsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="companies" element={<CompaniesPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="email-verified" element={<EmailVerifiedPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute role="candidate" />}>
        <Route path="candidate" element={<DashboardLayout role="candidate" />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="applications" element={<CandidateApplications />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<CandidateSettings />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="employer" />}>
        <Route path="employer" element={<DashboardLayout role="employer" />}>
          <Route index element={<EmployerDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="applicants" element={<ApplicantsPage />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<EmployerSettings />} />
          <Route path="candidate-profile" element={<CandidateProfile />} />
        </Route>
      </Route>

      <Route path="dashboard" element={<Navigate to="/candidate" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
