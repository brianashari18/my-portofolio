import ActionLink from '../components/ActionLink';
import PageIntro from '../components/PageIntro';

export default function NotFound() {
  return <section className="nova-page nova-not-found page-shell">
    <PageIntro title="Page not found">The address may have changed.</PageIntro>
    <div className="nova-not-found__actions">
      <ActionLink to="/projects" arrow="→">Browse projects</ActionLink>
      <ActionLink to="/" variant="outline" arrow={false}>Back to home</ActionLink>
    </div>
  </section>;
}
