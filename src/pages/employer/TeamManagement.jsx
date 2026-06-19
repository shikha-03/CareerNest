import EmptyState from "../../components/feedback/EmptyState";
import usePageTitle from "../../hooks/usePageTitle";

export default function TeamManagement() {
  usePageTitle("Team");
  return <EmptyState icon="diversity_3" title="Team management" body="Invite hiring managers, assign roles, and collaborate on applicant reviews from this workspace." action="Invite teammate" to="/employer/team" />;
}
