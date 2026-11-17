import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, ClipboardEvent, FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import ProjectArtwork from '../components/ProjectArtwork';
import { usePortfolioContent } from '../context/usePortfolioContent';
import { defaultPortfolioContent } from '../data/portfolioData';
import type { EvidenceLevel, Experience, GalleryTone, PortfolioContent, Project, ProjectCategory, ProjectGalleryImage, Skill } from '../data/portfolioData';
import { checkPortfolioAdmin, readPortfolioContent } from '../lib/portfolioRepository';
import { mergeReviewedProjectUpdates } from '../lib/mergeReviewedProjectUpdates';
import { getDefaultProjectImageFrame, getProjectGalleryImage } from '../lib/resolvePortfolioImage';
import { PORTFOLIO_IMAGE_ACCEPT, PORTFOLIO_IMAGE_MAX_BYTES, uploadPortfolioImage } from '../lib/imageStorage';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type AdminAccess = 'checking' | 'granted' | 'denied';
type DocumentState = 'checking' | 'ready' | 'missing' | 'error';
type AdminTab = 'profile' | 'projects' | 'experience' | 'skills';

const tabs: { id: AdminTab; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
];

export default function Admin() {
  const { content, saveContent } = usePortfolioContent();
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [resetNotice, setResetNotice] = useState('');
  const [isRequestingReset, setIsRequestingReset] = useState(false);
  const [access, setAccess] = useState<AdminAccess>('checking');
  const [draft, setDraft] = useState<PortfolioContent>(() => cloneContent(content));
  const [activeTab, setActiveTab] = useState<AdminTab>('profile');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(draft.projects[0]?.id ?? null);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(draft.experiences[0]?.id ?? null);
  const [documentState, setDocumentState] = useState<DocumentState>('checking');
  const [contentRetry, setContentRetry] = useState(0);
  const [editorRevision, setEditorRevision] = useState(0);
  const [hasRemoteDocument, setHasRemoteDocument] = useState(false);
  const [hasPendingContentSync, setHasPendingContentSync] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isDirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content]);

  useEffect(() => {
    setDraft(cloneContent(content));
  }, [content]);

  useEffect(() => {
    if (selectedProjectId && !draft.projects.some((project) => project.id === selectedProjectId)) setSelectedProjectId(draft.projects[0]?.id ?? null);
  }, [draft.projects, selectedProjectId]);

  useEffect(() => {
    if (selectedExperienceId && !draft.experiences.some((experience) => experience.id === selectedExperienceId)) setSelectedExperienceId(draft.experiences[0]?.id ?? null);
  }, [draft.experiences, selectedExperienceId]);

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session);
    }).finally(() => {
      if (active) setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setNotice('');
      setErrorMessage('');
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session || !supabase) {
      setAccess('checking');
      setHasRemoteDocument(false);
      setHasPendingContentSync(false);
      setDocumentState('checking');
      return;
    }

    let active = true;
    setAccess('checking');
    setDocumentState('checking');
    setErrorMessage('');
    checkPortfolioAdmin(session.user.id)
      .then((isAdmin) => {
        if (!active) return;
        if (!isAdmin) {
          setAccess('denied');
          return;
        }
        setAccess('granted');
        readPortfolioContent()
          .then((remoteContent) => {
            if (!active) return;
            setHasRemoteDocument(Boolean(remoteContent));
            setDocumentState(remoteContent ? 'ready' : 'missing');
            if (remoteContent) {
              const reviewedContent = mergeReviewedProjectUpdates(remoteContent);
              setHasPendingContentSync(reviewedContent !== remoteContent);
              setDraft(cloneContent(reviewedContent));
            } else {
              setHasPendingContentSync(false);
            }
          })
          .catch((error: unknown) => {
            if (!active) return;
            setDocumentState('error');
            setErrorMessage(error instanceof Error ? error.message : 'Could not load saved portfolio content.');
          });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setAccess('denied');
        setErrorMessage(error instanceof Error ? error.message : 'Could not verify admin access.');
      });

    return () => { active = false; };
  }, [session, contentRetry]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const formData = new FormData(event.currentTarget);
    setErrorMessage('');
    setNotice('');
    setResetNotice('');
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: String(formData.get('password') ?? ''),
    });
    if (error) setErrorMessage(error.message);
  }

  async function handleRequestPasswordReset() {
    if (!supabase) return;
    const email = loginEmail.trim();
    setErrorMessage('');
    setResetNotice('');
    if (!email) {
      setErrorMessage('Enter your email address above first.');
      return;
    }

    setIsRequestingReset(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (error) setErrorMessage(error.message);
      else setResetNotice('If this email is registered, a reset link will arrive in your inbox. Open it, then return to /admin to set your password.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not request a password reset.');
    } finally {
      setIsRequestingReset(false);
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) setErrorMessage(error.message);
  }

  async function handleInitialize() {
    setIsSaving(true);
    setErrorMessage('');
    try {
      const initial = cloneContent(defaultPortfolioContent);
      await saveContent(initial);
      setDraft(initial);
      setHasRemoteDocument(true);
      setHasPendingContentSync(false);
      setDocumentState('ready');
      setNotice('Portfolio content is initialized. Review it and save any changes you make.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not initialize portfolio content.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSave() {
    const validationError = validateContent(draft);
    if (validationError) {
      setErrorMessage(validationError);
      setNotice('');
      return;
    }
    setIsSaving(true);
    setErrorMessage('');
    setNotice('');
    try {
      await saveContent(draft);
      setHasRemoteDocument(true);
      setHasPendingContentSync(false);
      setDocumentState('ready');
      setNotice('Changes saved and published to the portfolio.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not save portfolio content.');
    } finally {
      setIsSaving(false);
    }
  }

  if (!isSupabaseConfigured) {
    return <AdminFrame>
      <div className="admin-gate">
        <p className="eyebrow">Portfolio CMS</p>
        <h1>Connect the content database.</h1>
        <p>Admin login is not available until the Supabase project keys are configured for this site.</p>
        <ol>
          <li>Create a Supabase project and apply the migration in <code>supabase/migrations</code>.</li>
          <li>Add the project URL and publishable key to a local <code>.env.local</code> file or GitHub Actions secrets.</li>
          <li>Follow the admin account setup steps in the project README.</li>
        </ol>
        <Link className="text-link" to="/">Back to portfolio →</Link>
      </div>
    </AdminFrame>;
  }

  if (authLoading) {
    return <AdminFrame><div className="admin-gate"><p className="eyebrow">Portfolio CMS</p><h1>Checking session…</h1></div></AdminFrame>;
  }

  if (!session) {
    return <AdminFrame>
      <section className="admin-login">
        <p className="eyebrow">Private workspace · Admin only</p>
        <h1>Sign in to manage the portfolio.</h1>
        <p>Use the admin account created for this Supabase project. Public visitors cannot create accounts.</p>
        <form className="admin-form" onSubmit={handleLogin}>
          <TextField label="Email" name="email" type="email" autoComplete="username" value={loginEmail} onChange={setLoginEmail} required />
          <TextField label="Password" name="password" type="password" autoComplete="current-password" required />
          {errorMessage && <p className="admin-alert admin-alert--error" role="alert">{errorMessage}</p>}
          {resetNotice && <p className="admin-alert admin-alert--success" role="status">{resetNotice}</p>}
          <button className="button button--dark" type="submit">Sign in <span aria-hidden="true">↗</span></button>
          <button className="admin-reset-button" type="button" onClick={handleRequestPasswordReset} disabled={isRequestingReset}>
            {isRequestingReset ? 'Sending reset link…' : 'Forgot password? Send a reset link'}
          </button>
        </form>
      </section>
    </AdminFrame>;
  }

  if (access === 'checking') {
    return <AdminFrame><div className="admin-gate"><p className="eyebrow">Portfolio CMS</p><h1>Checking admin access…</h1></div></AdminFrame>;
  }

  if (access === 'denied') {
    return <AdminFrame>
      <div className="admin-gate">
        <p className="eyebrow">Portfolio CMS</p>
        <h1>{errorMessage ? 'Could not verify admin access.' : 'This account does not have admin access.'}</h1>
        <p>{errorMessage ? 'Check the database migration and Supabase connection, then retry.' : <>Add this account’s user ID to <code>public.portfolio_admins</code> in the Supabase SQL editor, then sign in again.</>}</p>
        {errorMessage && <p className="admin-alert admin-alert--error" role="alert">{errorMessage}</p>}
        <PasswordSetupPanel />
        <button className="button button--dark" type="button" onClick={handleSignOut}>Sign out</button>
      </div>
    </AdminFrame>;
  }

  if (documentState === 'checking' && access === 'granted') {
    return <AdminFrame><div className="admin-gate"><p className="eyebrow">Portfolio CMS</p><h1>Loading saved content…</h1></div></AdminFrame>;
  }

  if (documentState === 'error') {
    return <AdminFrame>
      <div className="admin-gate">
        <p className="eyebrow">Portfolio CMS</p>
        <h1>Could not load saved content.</h1>
        <p>The admin account is verified, but the portfolio document could not be read. Check the database connection and migration before trying again.</p>
        {errorMessage && <p className="admin-alert admin-alert--error" role="alert">{errorMessage}</p>}
        <PasswordSetupPanel />
        <button className="button button--dark" type="button" onClick={() => setContentRetry((value) => value + 1)}>Retry</button>
      </div>
    </AdminFrame>;
  }

  if (!hasRemoteDocument) {
    return <AdminFrame>
      <div className="admin-gate">
        <p className="eyebrow">Portfolio CMS · First setup</p>
        <h1>Initialize editable content.</h1>
        <p>The database is connected, but it does not have a portfolio document yet. Start with the current site content, then edit and publish it here.</p>
        {errorMessage && <p className="admin-alert admin-alert--error" role="alert">{errorMessage}</p>}
        <PasswordSetupPanel />
        <button className="button button--dark" type="button" onClick={handleInitialize} disabled={isSaving}>
          {isSaving ? 'Initializing…' : 'Initialize from current portfolio'}
        </button>
      </div>
    </AdminFrame>;
  }

  function updateDraft(update: (current: PortfolioContent) => PortfolioContent) {
    setDraft((current) => update(current));
    setNotice('');
  }

  function applyProject(project: Project, isExisting: boolean): string | null {
    const duplicateId = draft.projects.some((item) => item.id === project.id);
    if (duplicateId && !isExisting) return `A project already uses the “${project.id}” ID.`;
    const duplicateSlug = draft.projects.some((item) => item.id !== project.id && item.slug === project.slug);
    if (duplicateSlug) return `A project already uses the “${project.slug}” URL slug.`;
    updateDraft((current) => ({
      ...current,
      projects: isExisting ? current.projects.map((item) => item.id === project.id ? project : item) : [...current.projects, project],
    }));
    return null;
  }

  function removeProject(id: string) {
    updateDraft((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id),
      skillCategories: current.skillCategories.map((category) => ({
        ...category,
        skills: category.skills.map((skill) => ({ ...skill, evidenceIds: skill.evidenceIds.filter((evidenceId) => evidenceId !== id) })),
      })),
    }));
    setSelectedProjectId(null);
  }

  function applyExperience(experience: Experience, isExisting: boolean): string | null {
    const duplicate = draft.experiences.some((item) => item.id === experience.id);
    if (duplicate && !isExisting) return 'That experience ID is already in use.';
    updateDraft((current) => ({
      ...current,
      experiences: isExisting ? current.experiences.map((item) => item.id === experience.id ? experience : item) : [...current.experiences, experience],
    }));
    return null;
  }

  function removeExperience(id: string) {
    updateDraft((current) => ({
      ...current,
      experiences: current.experiences.filter((experience) => experience.id !== id),
      skillCategories: current.skillCategories.map((category) => ({
        ...category,
        skills: category.skills.map((skill) => ({ ...skill, evidenceIds: skill.evidenceIds.filter((evidenceId) => evidenceId !== id) })),
      })),
    }));
    setSelectedExperienceId(null);
  }

  const selectedProject = draft.projects.find((project) => project.id === selectedProjectId);
  const selectedExperience = draft.experiences.find((experience) => experience.id === selectedExperienceId);

  return <AdminFrame>
    <div className="admin-workspace">
      <header className="admin-heading">
        <div><p className="eyebrow">Portfolio CMS · Signed in as {session.user.email}</p><h1>Manage your portfolio.</h1><p>Edit the content shown on the public site, then save to publish.</p></div>
        <div className="admin-heading__actions">
          <Link className="text-link" to="/">View site ↗</Link>
          <button className="button button--outline" type="button" onClick={handleSignOut}>Sign out</button>
        </div>
      </header>

      <PasswordSetupPanel />

      <div className="admin-toolbar">
        <span className={`admin-save-state${isDirty || hasPendingContentSync ? ' is-dirty' : ''}`} aria-live="polite">
          {isDirty ? 'Unsaved changes' : hasPendingContentSync ? 'Reviewed project updates await CMS save' : 'All changes saved'}
        </span>
        <div className="admin-toolbar__actions">
          <button className="button button--outline" type="button" onClick={() => { setDraft(cloneContent(content)); setEditorRevision((revision) => revision + 1); setNotice('Draft changes discarded.'); setErrorMessage(''); }} disabled={!isDirty || isSaving}>Discard</button>
          <button className="button button--dark" type="button" onClick={handleSave} disabled={(!isDirty && !hasPendingContentSync) || isSaving}>
            {isSaving ? 'Saving…' : 'Save & publish'} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      {notice && <p className="admin-alert admin-alert--success" role="status">{notice}</p>}
      {errorMessage && <p className="admin-alert admin-alert--error" role="alert">{errorMessage}</p>}

      <div className="admin-layout">
        <nav className="admin-tabs" aria-label="Portfolio content sections">
          {tabs.map((tab) => <button key={tab.id} type="button" className={activeTab === tab.id ? 'is-active' : ''} aria-current={activeTab === tab.id ? 'page' : undefined} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}
        </nav>

        <section className="admin-panel" hidden={activeTab !== 'profile'} aria-label="Profile content">
          <div className="admin-panel__heading"><p className="eyebrow">Public identity</p><h2>Profile</h2><p>These details appear across the site and in contact links.</p></div>
          <div className="admin-form admin-form--grid">
            <TextField label="Name" value={draft.personalInfo.name} onChange={(value) => updateDraft((current) => ({ ...current, personalInfo: { ...current.personalInfo, name: value } }))} />
            <TextField label="Professional title" value={draft.personalInfo.title} onChange={(value) => updateDraft((current) => ({ ...current, personalInfo: { ...current.personalInfo, title: value } }))} />
            <TextField label="Location" value={draft.personalInfo.location} onChange={(value) => updateDraft((current) => ({ ...current, personalInfo: { ...current.personalInfo, location: value } }))} />
            <TextField label="Email" type="email" value={draft.personalInfo.email} onChange={(value) => updateDraft((current) => ({ ...current, personalInfo: { ...current.personalInfo, email: value } }))} />
            <TextField label="GitHub URL" type="url" value={draft.personalInfo.github} onChange={(value) => updateDraft((current) => ({ ...current, personalInfo: { ...current.personalInfo, github: value } }))} />
            <TextField label="LinkedIn URL" type="url" value={draft.personalInfo.linkedin} onChange={(value) => updateDraft((current) => ({ ...current, personalInfo: { ...current.personalInfo, linkedin: value } }))} />
            <TextField className="admin-field--wide" label="Summary" multiline value={draft.personalInfo.summary} onChange={(value) => updateDraft((current) => ({ ...current, personalInfo: { ...current.personalInfo, summary: value } }))} />
            <ImageField className="admin-field--wide" label="Profile image URL" folder="profile" value={draft.personalInfo.profileImage} onChange={(value) => updateDraft((current) => ({ ...current, personalInfo: { ...current.personalInfo, profileImage: value } }))} />
          </div>
        </section>

        <section className="admin-panel" hidden={activeTab !== 'projects'} aria-label="Project content">
          <div className="admin-panel__heading"><p className="eyebrow">Case studies</p><h2>Projects</h2><p>Add, edit, and remove the projects shown on the public work pages.</p></div>
          <div className="admin-record-layout">
            <RecordList label="Projects" items={draft.projects.map((project) => ({ id: project.id, title: project.title, meta: project.categories.join(' · ') }))} selectedId={selectedProjectId} onSelect={setSelectedProjectId} onAdd={() => setSelectedProjectId(null)} addLabel="Add project" />
            <ProjectEditor key={`${selectedProject?.id ?? 'new-project'}-${editorRevision}`} project={selectedProject} onApply={applyProject} onDelete={selectedProject ? () => removeProject(selectedProject.id) : undefined} />
          </div>
        </section>

        <section className="admin-panel" hidden={activeTab !== 'experience'} aria-label="Experience content">
          <div className="admin-panel__heading"><p className="eyebrow">Professional background</p><h2>Experience</h2><p>Keep role descriptions and contributions specific to verified experience.</p></div>
          <div className="admin-record-layout">
            <RecordList label="Roles" items={draft.experiences.map((item) => ({ id: item.id, title: item.organization, meta: item.position }))} selectedId={selectedExperienceId} onSelect={setSelectedExperienceId} onAdd={() => setSelectedExperienceId(null)} addLabel="Add experience" />
            <ExperienceEditor key={`${selectedExperience?.id ?? 'new-experience'}-${editorRevision}`} experience={selectedExperience} onApply={applyExperience} onDelete={selectedExperience ? () => removeExperience(selectedExperience.id) : undefined} />
          </div>
        </section>

        <section className="admin-panel" hidden={activeTab !== 'skills'} aria-label="Skill content">
          <div className="admin-panel__heading"><p className="eyebrow">Evidence-linked skills</p><h2>Skills</h2><p>Link each skill to a project or experience ID, or add a short evidence note.</p></div>
          <SkillsEditor key={`skills-${editorRevision}`} content={draft} onChange={(skillCategories) => updateDraft((current) => ({ ...current, skillCategories }))} />
        </section>
      </div>
      <p className="admin-footnote">Content is saved to Supabase. Changes become public when you select <strong>Save &amp; publish</strong>.</p>
    </div>
  </AdminFrame>;
}

function AdminFrame({ children }: { children: React.ReactNode }) {
  return <div className="page wrap admin-page">{children}</div>;
}

function ImageField({ label, value, onChange, folder, className = '', applyHint = 'Save & publish to publish this image.' }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: string;
  className?: string;
  applyHint?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    setNotice('');
    setErrorMessage('');
    setIsUploading(true);
    try {
      const url = await uploadPortfolioImage(file, folder);
      onChange(url);
      setNotice(`Image uploaded. ${applyHint}`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not upload this image.');
    } finally {
      setIsUploading(false);
      input.value = '';
    }
  }

  return <div className={`admin-image-field ${className}`.trim()}>
    <TextField label={label} value={value} onChange={onChange} hint="You can paste a public HTTPS URL or upload a file below." />
    <label className="admin-field admin-image-upload">
      <span>{isUploading ? 'Uploading image…' : 'Upload from this device'}</span>
      <input type="file" accept={PORTFOLIO_IMAGE_ACCEPT} onChange={handleFileChange} disabled={isUploading} />
      <small>PNG, JPEG, WebP, AVIF, or HEIC/HEIF · HEIC converts to JPEG · up to {PORTFOLIO_IMAGE_MAX_BYTES / 1024 / 1024} MB. Uploaded files are public.</small>
    </label>
    {notice && <p className="admin-inline-message" role="status">{notice}</p>}
    {errorMessage && <p className="admin-inline-message is-error" role="alert">{errorMessage}</p>}
    {value && <img className="admin-image-preview" src={value} alt={`${label} preview`} loading="lazy" />}
  </div>;
}

function PasswordSetupPanel() {
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const password = String(formData.get('new-password') ?? '');
    const confirmation = String(formData.get('confirm-password') ?? '');
    setNotice('');
    setErrorMessage('');
    if (password !== confirmation) {
      setErrorMessage('The passwords do not match.');
      return;
    }

    setIsSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setErrorMessage(error.message);
    else {
      setNotice('Password saved. Sign out, then sign in again with this password.');
      form.reset();
    }
    setIsSaving(false);
  }

  return <section className="admin-security" aria-labelledby="admin-security-title">
    <div>
      <p className="eyebrow">Account security</p>
      <h2 id="admin-security-title">Set your admin password</h2>
      <p>Use this after accepting an invitation, or whenever you need to change your password.</p>
    </div>
    <form className="admin-form" onSubmit={handleSubmit}>
      <TextField label="New password" name="new-password" type="password" autoComplete="new-password" required minLength={12} />
      <TextField label="Confirm password" name="confirm-password" type="password" autoComplete="new-password" required minLength={12} />
      {errorMessage && <p className="admin-alert admin-alert--error" role="alert">{errorMessage}</p>}
      {notice && <p className="admin-alert admin-alert--success" role="status">{notice}</p>}
      <button className="button button--dark" type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save password'}</button>
    </form>
  </section>;
}

function TextField({ label, value, onChange, name, type = 'text', multiline = false, required = false, hint, className = '', autoComplete, readOnly = false, minLength }: {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  hint?: string;
  className?: string;
  autoComplete?: string;
  readOnly?: boolean;
  minLength?: number;
}) {
  return <label className={`admin-field ${className}`}>
    <span>{label}</span>
    {multiline
      ? <textarea name={name} value={value ?? ''} onChange={(event) => onChange?.(event.target.value)} rows={4} required={required} />
      : <input name={name} type={type} value={value} onChange={(event) => onChange?.(event.target.value)} required={required} autoComplete={autoComplete} readOnly={readOnly} minLength={minLength} />}
    {hint && <small>{hint}</small>}
  </label>;
}

function RecordList({ label, items, selectedId, onSelect, onAdd, addLabel }: {
  label: string;
  items: { id: string; title: string; meta: string }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  addLabel: string;
}) {
  return <aside className="admin-record-list" aria-label={label}>
    {items.map((item) => <button key={item.id} type="button" className={selectedId === item.id ? 'is-active' : ''} aria-pressed={selectedId === item.id} onClick={() => onSelect(item.id)}><strong>{item.title}</strong><span>{item.meta || item.id}</span></button>)}
    <button className="admin-add-button" type="button" onClick={onAdd}>＋ {addLabel}</button>
  </aside>;
}

interface ProjectForm {
  id: string; slug: string; title: string; tagline: string; description: string;
  categories: string; platforms: string; technologies: string; role: string; timeline: string; location: string; status: string;
  featured: boolean; galleryTone: GalleryTone | '';
  problem: string; solution: string; features: string; architectureSummary: string; architectureDiagram: string; architectureCaption: string;
  engineeringChallenges: string; contributions: string; results: string; reflections: string; links: string;
}

function projectGalleryFrom(project?: Project): ProjectGalleryImage[] {
  if (!project) return [];
  const seen = new Set<string>();
  const images = (project.gallery ?? []).filter((image) => {
    if (!image.src || seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  }).map((image) => getProjectGalleryImage(project, image));
  const defaultFrame = getDefaultProjectImageFrame(project.platforms);
  for (const src of [project.heroImage, project.thumbnail]) {
    if (src && !seen.has(src)) {
      seen.add(src);
      images.push({ src, alt: `Screenshot from ${project.title}`, ...defaultFrame });
    }
  }
  return images;
}

function projectToForm(project?: Project): ProjectForm {
  const fallbackProject = defaultPortfolioContent.projects.find((item) => item.id === project?.id);
  return {
    id: project?.id ?? '', slug: project?.slug ?? '', title: project?.title ?? '', tagline: project?.tagline ?? '', description: project?.description ?? '',
    categories: project?.categories.join('\n') ?? '', platforms: project?.platforms.join('\n') ?? '', technologies: project?.technologies.join('\n') ?? '',
    role: project?.role ?? '', timeline: project?.timeline ?? '', location: project?.location ?? '', status: project?.status ?? '', featured: project?.featured ?? false,
    galleryTone: project?.galleryTone ?? '',
    problem: project?.problem?.trim() ? project.problem : project?.workflow?.rationale ?? fallbackProject?.problem ?? fallbackProject?.workflow?.rationale ?? '',
    solution: project?.solution ?? '', features: project?.features?.join('\n') ?? '',
    architectureSummary: project?.architecture?.summary ?? '', architectureDiagram: project?.architecture?.diagram ?? '', architectureCaption: project?.architecture?.caption ?? '',
    engineeringChallenges: project?.engineeringChallenges?.join('\n') ?? '', contributions: project?.contributions?.join('\n') ?? '',
    results: project?.results?.join('\n') ?? '', reflections: project?.reflections?.join('\n') ?? '',
    links: project?.links?.map((link) => `${link.label} | ${link.href} | ${link.kind}`).join('\n') ?? '',
  };
}

function ProjectEditor({ project, onApply, onDelete }: { project?: Project; onApply: (project: Project, isExisting: boolean) => string | null; onDelete?: () => void }) {
  const [form, setForm] = useState(() => projectToForm(project));
  const [gallery, setGallery] = useState(() => projectGalleryFrom(project));
  const [coverSource, setCoverSource] = useState(() => project?.thumbnail ?? project?.heroImage ?? projectGalleryFrom(project)[0]?.src ?? '');
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [message, setMessage] = useState('');
  const [deletePrompt, setDeletePrompt] = useState(false);

  function setField<K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isUploadingImages) {
      setMessage('Wait for the screenshot uploads to finish before applying this project.');
      return;
    }
    const imageSources = [form.architectureDiagram, ...gallery.map((image) => image.src)].filter(Boolean);
    if (imageSources.some((source) => !isAllowedImageUrl(source))) {
      setMessage('Image URLs must use HTTPS or an existing site path starting with /.');
      return;
    }
    const galleryImages: ProjectGalleryImage[] = gallery.filter((image) => image.src.trim()).map((image) => ({
      src: image.src.trim(),
      alt: image.alt.trim(),
      ...(image.title?.trim() ? { title: image.title.trim() } : {}),
      ...(image.caption?.trim() ? { caption: image.caption.trim() } : {}),
      frame: image.frame ?? 'none',
      ...(image.frame === 'phone' && image.frameStyle ? { frameStyle: image.frameStyle } : {}),
    }));
    if (galleryImages.some((image) => !image.alt)) {
      setMessage('Add descriptive alt text for each project image.');
      return;
    }
    const linkRows = form.links.split('\n').map((line) => line.split('|').map((part) => part.trim())).filter((parts) => parts[0] && parts[1]);
    if (linkRows.some((parts) => !isAllowedLink(parts[1]))) {
      setMessage('Project links must use HTTPS, HTTP, mailto, or a site path starting with /.');
      return;
    }
    const categories = parseLines(form.categories) as ProjectCategory[];
    const selectedCover = galleryImages.some((image) => image.src === coverSource) ? coverSource : galleryImages[0]?.src ?? '';
    const architecture = form.architectureSummary.trim() || form.architectureDiagram.trim()
      ? { summary: form.architectureSummary.trim(), ...(form.architectureDiagram.trim() ? { diagram: form.architectureDiagram.trim() } : {}), ...(form.architectureCaption.trim() ? { caption: form.architectureCaption.trim() } : {}) }
      : undefined;
    const links = linkRows.map(([label, href, kind]) => ({ label, href, kind: (['github', 'demo', 'video', 'other'].includes(kind) ? kind : 'other') as 'github' | 'demo' | 'video' | 'other' }));
    const nextProject: Project = {
      id: form.id.trim(), slug: form.slug.trim(), title: form.title.trim(), tagline: form.tagline.trim(), description: form.description.trim(),
      categories, platforms: parseLines(form.platforms), technologies: parseLines(form.technologies), featured: form.featured,
      ...(form.role.trim() ? { role: form.role.trim() } : {}), ...(form.timeline.trim() ? { timeline: form.timeline.trim() } : {}), ...(form.location.trim() ? { location: form.location.trim() } : {}), ...(form.status.trim() ? { status: form.status.trim() } : {}),
      ...(selectedCover ? { thumbnail: selectedCover, heroImage: selectedCover } : {}), ...(form.galleryTone ? { galleryTone: form.galleryTone } : {}), ...(galleryImages.length ? { gallery: galleryImages } : {}),
      ...(form.problem.trim() ? { problem: form.problem.trim() } : {}), ...(form.solution.trim() ? { solution: form.solution.trim() } : {}),
      ...(parseLines(form.features).length ? { features: parseLines(form.features) } : {}), ...(architecture ? { architecture } : {}),
      ...(project?.workflow ? { workflow: project.workflow } : {}),
      ...(parseLines(form.engineeringChallenges).length ? { engineeringChallenges: parseLines(form.engineeringChallenges) } : {}),
      ...(parseLines(form.contributions).length ? { contributions: parseLines(form.contributions) } : {}), ...(parseLines(form.results).length ? { results: parseLines(form.results) } : {}),
      ...(parseLines(form.reflections).length ? { reflections: parseLines(form.reflections) } : {}), ...(links.length ? { links } : {}),
    };
    const error = onApply(nextProject, Boolean(project));
    setMessage(error ?? 'Applied to draft. Save & publish to make it public.');
  }

  return <form className="admin-form admin-editor" onSubmit={handleSubmit}>
    <div className="admin-editor__heading"><div><p className="eyebrow">{project ? 'Edit case study' : 'New case study'}</p><h3>{project?.title ?? 'Add a project'}</h3></div>{onDelete && <button className="admin-delete-button" type="button" onClick={() => setDeletePrompt(true)}>Delete</button>}</div>
    {deletePrompt && <div className="admin-confirm" role="group" aria-label="Confirm project deletion"><span>Remove this project from the draft?</span><button type="button" onClick={onDelete}>Remove</button><button type="button" onClick={() => setDeletePrompt(false)}>Keep</button></div>}
    <div className="admin-form admin-form--grid">
      <TextField label="Project ID" value={form.id} onChange={(value) => setField('id', value)} required readOnly={Boolean(project)} hint="Stable ID used by skill evidence links." />
      <TextField label="URL slug" value={form.slug} onChange={(value) => setField('slug', value)} required hint="Used in /projects/your-slug." />
      <TextField label="Project title" value={form.title} onChange={(value) => setField('title', value)} required />
      <TextField label="Tagline" value={form.tagline} onChange={(value) => setField('tagline', value)} required />
      <TextField className="admin-field--wide" label="Short description" multiline value={form.description} onChange={(value) => setField('description', value)} required />
      <TextField label="Categories · one per line" multiline value={form.categories} onChange={(value) => setField('categories', value)} required hint="Examples: iOS Development, AI / ML Engineering" />
      <TextField label="Platforms · one per line" multiline value={form.platforms} onChange={(value) => setField('platforms', value)} required />
      <TextField className="admin-field--wide" label="Technologies · one per line" multiline value={form.technologies} onChange={(value) => setField('technologies', value)} />
      <TextField label="Role / project context" value={form.role} onChange={(value) => setField('role', value)} hint="Your role, or context such as a course project." />
      <TextField label="Timeline" value={form.timeline} onChange={(value) => setField('timeline', value)} />
      <TextField label="Location" value={form.location} onChange={(value) => setField('location', value)} />
      <TextField label="Status" value={form.status} onChange={(value) => setField('status', value)} hint="For example: Prototype, In progress." />
      <label className="admin-checkbox"><input type="checkbox" checked={form.featured} onChange={(event) => setField('featured', event.target.checked)} /><span>Show in selected work</span></label>
      <TextField className="admin-field--wide" label="Why this project exists" multiline value={form.problem} onChange={(value) => setField('problem', value)} hint="Describe the problem, need, or research question that motivated the project." />
      <TextField className="admin-field--wide" label="Approach" multiline value={form.solution} onChange={(value) => setField('solution', value)} />
      <TextField className="admin-field--wide" label="Features · one per line" multiline value={form.features} onChange={(value) => setField('features', value)} />
      <TextField className="admin-field--wide" label="Technical implementation" multiline value={form.architectureSummary} onChange={(value) => setField('architectureSummary', value)} />
      <ImageField label="Architecture diagram URL" folder={`projects/${form.id || form.slug || 'new-project'}`} value={form.architectureDiagram} onChange={(value) => setField('architectureDiagram', value)} applyHint="Apply to draft, then Save & publish." />
      <TextField label="Diagram caption" value={form.architectureCaption} onChange={(value) => setField('architectureCaption', value)} />
      <TextField label="Engineering challenges · one per line" multiline value={form.engineeringChallenges} onChange={(value) => setField('engineeringChallenges', value)} />
      <TextField label="My contributions · one per line" multiline value={form.contributions} onChange={(value) => setField('contributions', value)} hint="Name the parts you personally implemented or decided; leave out unverified team-level work." />
      <TextField label="Results · one per line" multiline value={form.results} onChange={(value) => setField('results', value)} />
      <TextField label="Reflection · one per line" multiline value={form.reflections} onChange={(value) => setField('reflections', value)} />
      <TextField className="admin-field--wide" label="Links · one per line: label | URL | kind" multiline value={form.links} onChange={(value) => setField('links', value)} hint="Kinds: github, demo, video, other." />
    </div>
    <ProjectGalleryEditor
      projectTitle={form.title}
      platforms={parseLines(form.platforms)}
      folder={`projects/${form.id || form.slug || 'new-project'}`}
      images={gallery}
      coverSource={coverSource}
      tone={form.galleryTone}
      onChange={setGallery}
      onCoverChange={setCoverSource}
      onToneChange={(value) => setField('galleryTone', value)}
      isUploading={isUploadingImages}
      onUploadingChange={setIsUploadingImages}
    />
    {message && <p className={`admin-inline-message${message.startsWith('Applied') ? '' : ' is-error'}`} role={message.startsWith('Applied') ? 'status' : 'alert'}>{message}</p>}
    <div className="admin-form-actions"><button className="button button--dark" type="submit" disabled={isUploadingImages}>Apply to draft</button></div>
  </form>;
}

function ProjectGalleryEditor({ projectTitle, platforms, folder, images, coverSource, tone, onChange, onCoverChange, onToneChange, isUploading, onUploadingChange }: {
  projectTitle: string;
  platforms: string[];
  folder: string;
  images: ProjectGalleryImage[];
  coverSource: string;
  tone: GalleryTone | '';
  onChange: (images: ProjectGalleryImage[]) => void;
  onCoverChange: (source: string) => void;
  onToneChange: (tone: GalleryTone | '') => void;
  isUploading: boolean;
  onUploadingChange: (isUploading: boolean) => void;
}) {
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const defaultFrame = getDefaultProjectImageFrame(platforms);

  function updateImage(index: number, changes: Partial<ProjectGalleryImage>) {
    onChange(images.map((image, itemIndex) => itemIndex === index ? { ...image, ...changes } : image));
    if (changes.src !== undefined && (images[index].src === coverSource || !coverSource)) {
      onCoverChange(changes.src);
    }
  }

  function moveImage(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const reordered = [...images];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    onChange(reordered);
  }

  function removeImage(index: number) {
    const removed = images[index];
    const remaining = images.filter((_, itemIndex) => itemIndex !== index);
    onChange(remaining);
    if (removed.src === coverSource) onCoverChange(remaining.find((image) => image.src)?.src ?? '');
  }

  function addUrlRow() {
    onChange([...images, { src: '', alt: `Screenshot from ${projectTitle || 'this project'}`, ...defaultFrame }]);
    setNotice('Paste an image URL in the new row. Its starting frame follows the selected platform; you can change it for each screenshot.');
    setErrorMessage('');
  }

  async function uploadScreenshots(files: File[]) {
    if (!files.length) return;
    setNotice('');
    setErrorMessage('');
    onUploadingChange(true);
    const uploaded: ProjectGalleryImage[] = [];
    try {
      for (const file of files) {
        const src = await uploadPortfolioImage(file, folder);
        uploaded.push({ src, alt: `Screenshot from ${projectTitle || 'this project'}`, ...defaultFrame });
      }
      onChange([...images, ...uploaded]);
      if (!coverSource && uploaded[0]) onCoverChange(uploaded[0].src);
      setNotice(`${uploaded.length} screenshot${uploaded.length === 1 ? '' : 's'} uploaded. Apply to draft, then save & publish.`);
    } catch (error) {
      if (uploaded.length) {
        onChange([...images, ...uploaded]);
        if (!coverSource) onCoverChange(uploaded[0].src);
      }
      setErrorMessage(error instanceof Error ? error.message : 'Could not upload these screenshots.');
    } finally {
      onUploadingChange(false);
    }
  }

  async function uploadFiles(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    await uploadScreenshots(Array.from(input.files ?? []));
    input.value = '';
  }

  function imageFilesFromPaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    const files = Array.from(event.clipboardData.items)
      .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter((file): file is File => Boolean(file));
    if (!files.length) return false;
    event.preventDefault();
    void uploadScreenshots(files);
    return true;
  }

  async function pasteFromClipboard() {
    if (!navigator.clipboard?.read) {
      setNotice('Focus the paste area, then paste a copied screenshot with ⌘V or Ctrl+V.');
      return;
    }
    setNotice('Reading clipboard…');
    setErrorMessage('');
    try {
      const clipboardItems = await navigator.clipboard.read();
      const files: File[] = [];
      for (const item of clipboardItems) {
        const imageType = item.types.find((type) => type.startsWith('image/'));
        if (!imageType) continue;
        const image = await item.getType(imageType);
        const extension = imageType === 'image/jpeg' ? 'jpg' : imageType.split('/')[1] || 'png';
        files.push(new File([image], `pasted-screenshot-${Date.now()}-${files.length + 1}.${extension}`, { type: imageType }));
      }
      if (!files.length) {
        setNotice('No image found in the clipboard. Copy a screenshot, focus the paste area, then press ⌘V or Ctrl+V.');
        return;
      }
      await uploadScreenshots(files);
    } catch {
      setNotice('Clipboard access was blocked. Focus the paste area and use ⌘V or Ctrl+V.');
    }
  }

  function handleScreenshotPaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    if (imageFilesFromPaste(event)) return;
    event.preventDefault();
    setNotice('No image found in the clipboard. Copy a screenshot, then try again.');
  }

  return <fieldset className="admin-gallery" disabled={isUploading}>
    <legend>Project screenshots</legend>
    <p className="admin-gallery__intro">Choose a cover, then order screenshots as a walkthrough. Name each screen, describe what it shows, and choose a frame for that screenshot.</p>
    <div className="admin-gallery__settings">
      <label className="admin-field">
        <span>Gallery backdrop</span>
        <select value={tone} onChange={(event) => onToneChange(event.target.value as GalleryTone | '')}>
          <option value="">Project default</option>
          <option value="paper">Paper</option>
          <option value="blush">Soft blush</option>
          <option value="surface">Warm stone</option>
          <option value="sage">Muted sage</option>
          <option value="ink">Ink</option>
        </select>
        <small>Choose the background for the cover and screenshot previews.</small>
      </label>
      <div className="admin-gallery__actions">
        <label className="admin-gallery__upload">
          <span>{isUploading ? 'Uploading screenshots…' : 'Upload screenshots'}</span>
          <input type="file" accept={PORTFOLIO_IMAGE_ACCEPT} multiple onChange={uploadFiles} disabled={isUploading} />
        <small>Select several files at once · PNG, JPEG, WebP, AVIF, or HEIC/HEIF · HEIC converts to JPEG · up to {PORTFOLIO_IMAGE_MAX_BYTES / 1024 / 1024} MB each. Frame defaults follow the selected platform and can be changed per screenshot.</small>
        </label>
        <div className="admin-gallery__paste">
          <span>Paste screenshot</span>
          <textarea aria-label="Paste screenshot from clipboard" rows={2} placeholder="Click to read clipboard, or paste with ⌘V / Ctrl+V" onClick={pasteFromClipboard} onPaste={handleScreenshotPaste} disabled={isUploading} />
          <small>Copy a screenshot first. It uploads directly to public portfolio storage; remove names and private content first.</small>
        </div>
        <button className="admin-add-button" type="button" onClick={addUrlRow} disabled={isUploading}>Add image by URL</button>
      </div>
    </div>
    {images.length > 0 && <ol className="admin-gallery__list" aria-label="Project screenshots in display order">
      {images.map((image, index) => <li className="admin-gallery-item" key={`${image.src || 'new'}-${index}`}>
        <div className="admin-gallery-item__preview" data-gallery-tone={tone || 'surface'}>
          <span className="admin-gallery-item__sequence">Screen {String(index + 1).padStart(2, '0')} of {String(images.length).padStart(2, '0')}</span>
          {image.src ? <ProjectArtwork image={image} decorative /> : <span>Screenshot preview</span>}
        </div>
        <div className="admin-gallery-item__content">
          <div className="admin-gallery-item__toolbar">
            <label className="admin-checkbox"><input type="radio" name="project-cover" checked={Boolean(image.src) && coverSource === image.src} disabled={!image.src} onChange={() => onCoverChange(image.src)} /><span>Use as cover</span></label>
            <div className="admin-gallery-item__order">
              <button type="button" aria-label={`Move screenshot ${index + 1} up`} onClick={() => moveImage(index, -1)} disabled={index === 0}>↑</button>
              <button type="button" aria-label={`Move screenshot ${index + 1} down`} onClick={() => moveImage(index, 1)} disabled={index === images.length - 1}>↓</button>
              <button type="button" aria-label={`Remove screenshot ${index + 1}`} onClick={() => removeImage(index)}>Remove</button>
            </div>
          </div>
          <div className="admin-form admin-form--grid admin-gallery-item__fields">
            <TextField className="admin-field--wide" label={`Image ${index + 1} URL`} value={image.src} onChange={(src) => updateImage(index, { src })} hint="Upload above or paste a public HTTPS image URL." />
            <TextField label="Screen title" value={image.title ?? ''} onChange={(title) => updateImage(index, { title })} hint="Name the screen or action, such as Guided entry." />
            <TextField label="Alt text" value={image.alt} onChange={(alt) => updateImage(index, { alt })} required={Boolean(image.src)} hint="Describe what is visible on the screen." />
            <TextField label="Caption" value={image.caption ?? ''} onChange={(caption) => updateImage(index, { caption })} hint="Explain what the screenshot demonstrates." />
            <label className="admin-field">
              <span>Presentation frame</span>
              <select value={image.frame === 'phone' ? image.frameStyle ?? 'none' : image.frame ?? 'none'} onChange={(event) => {
                const style = event.currentTarget.value;
                updateImage(index, {
                  frame: style === 'ios' || style === 'android' ? 'phone' : style as ProjectGalleryImage['frame'],
                  frameStyle: style === 'ios' || style === 'android' ? style : undefined,
                });
              }}>
                <option value="none">Original image</option>
                <option value="ios">iPhone 17 frame · Figma</option>
                <option value="android">Android Compact frame · Figma</option>
                <option value="laptop">MacBook Pro frame · Figma</option>
                <option value="browser">Browser frame</option>
              </select>
              <small>Figma-based iPhone 17, Android Compact, and MacBook Pro frames keep the uploaded screenshot replaceable. The choice applies to covers, galleries, and cards.</small>
            </label>
          </div>
        </div>
      </li>)}
    </ol>}
    {notice && <p className="admin-inline-message" role="status">{notice}</p>}
    {errorMessage && <p className="admin-inline-message is-error" role="alert">{errorMessage}</p>}
    {!images.length && <p className="admin-gallery__empty">No screenshots yet. Upload app screens or add an image URL to create the project gallery.</p>}
  </fieldset>;
}

interface ExperienceForm { id: string; organization: string; position: string; timeline: string; location: string; summary: string; contributions: string; technologies: string }

function ExperienceEditor({ experience, onApply, onDelete }: { experience?: Experience; onApply: (experience: Experience, isExisting: boolean) => string | null; onDelete?: () => void }) {
  const [form, setForm] = useState<ExperienceForm>(() => ({
    id: experience?.id ?? '', organization: experience?.organization ?? '', position: experience?.position ?? '', timeline: experience?.timeline ?? '', location: experience?.location ?? '', summary: experience?.summary ?? '',
    contributions: experience?.contributions.join('\n') ?? '', technologies: experience?.technologies.join('\n') ?? '',
  }));
  const [message, setMessage] = useState('');
  const [deletePrompt, setDeletePrompt] = useState(false);
  function setField<K extends keyof ExperienceForm>(key: K, value: ExperienceForm[K]) { setForm((current) => ({ ...current, [key]: value })); }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const timeline = form.timeline.trim();
    const location = form.location.trim();
    const error = onApply({
      id: form.id.trim(), organization: form.organization.trim(), position: form.position.trim(), summary: form.summary.trim(),
      ...(timeline ? { timeline } : {}), ...(location ? { location } : {}),
      contributions: parseLines(form.contributions), technologies: parseLines(form.technologies),
    }, Boolean(experience));
    setMessage(error ?? 'Applied to draft. Save & publish to make it public.');
  }

  return <form className="admin-form admin-editor" onSubmit={handleSubmit}>
    <div className="admin-editor__heading"><div><p className="eyebrow">{experience ? 'Edit experience' : 'New experience'}</p><h3>{experience?.organization ?? 'Add a role'}</h3></div>{onDelete && <button className="admin-delete-button" type="button" onClick={() => setDeletePrompt(true)}>Delete</button>}</div>
    {deletePrompt && <div className="admin-confirm" role="group" aria-label="Confirm experience deletion"><span>Remove this experience from the draft?</span><button type="button" onClick={onDelete}>Remove</button><button type="button" onClick={() => setDeletePrompt(false)}>Keep</button></div>}
    <div className="admin-form admin-form--grid">
      <TextField label="Experience ID" value={form.id} onChange={(value) => setField('id', value)} required readOnly={Boolean(experience)} hint="Stable ID used by skill evidence links." />
      <TextField label="Organization" value={form.organization} onChange={(value) => setField('organization', value)} required />
      <TextField className="admin-field--wide" label="Position" value={form.position} onChange={(value) => setField('position', value)} required />
      <TextField label="Timeline" value={form.timeline} onChange={(value) => setField('timeline', value)} />
      <TextField label="Location" value={form.location} onChange={(value) => setField('location', value)} />
      <TextField className="admin-field--wide" label="Summary" multiline value={form.summary} onChange={(value) => setField('summary', value)} required />
      <TextField label="Contributions · one per line" multiline value={form.contributions} onChange={(value) => setField('contributions', value)} />
      <TextField label="Technologies · one per line" multiline value={form.technologies} onChange={(value) => setField('technologies', value)} />
    </div>
    {message && <p className={`admin-inline-message${message.startsWith('Applied') ? '' : ' is-error'}`} role={message.startsWith('Applied') ? 'status' : 'alert'}>{message}</p>}
    <div className="admin-form-actions"><button className="button button--dark" type="submit">Apply to draft</button></div>
  </form>;
}

function SkillsEditor({ content, onChange }: { content: PortfolioContent; onChange: (categories: PortfolioContent['skillCategories']) => void }) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ category: '', newCategory: '', name: '', evidence: 'Demonstrated' as EvidenceLevel, evidenceIds: '', evidenceNote: '' });
  const evidenceOptions = [...content.projects.map((project) => ({ id: project.id, label: `Project · ${project.title}` })), ...content.experiences.map((item) => ({ id: item.id, label: `Experience · ${item.organization}` }))];

  function beginSkill(category: string, skill?: Skill) {
    setEditingKey(skill ? `${category}\n${skill.name}` : null);
    setForm({ category, newCategory: '', name: skill?.name ?? '', evidence: skill?.evidence ?? 'Demonstrated', evidenceIds: skill?.evidenceIds.join(', ') ?? '', evidenceNote: skill?.evidenceNote ?? '' });
  }

  function applySkill(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const targetCategory = form.newCategory.trim() || form.category.trim();
    if (!targetCategory) {
      setMessage('Choose a category or enter a new one.');
      return;
    }
    if (!form.name.trim()) {
      setMessage('Enter a skill name.');
      return;
    }
    const evidenceIds = form.evidenceIds.split(',').map((item) => item.trim()).filter(Boolean);
    const skill: Skill = { name: form.name.trim(), evidence: form.evidence, evidenceIds, ...(form.evidenceNote.trim() ? { evidenceNote: form.evidenceNote.trim() } : {}) };
    let categories = content.skillCategories.map((category) => ({ ...category, skills: [...category.skills] }));
    if (editingKey) {
      const [oldCategory, oldName] = editingKey.split('\n');
      categories = categories.map((category) => category.name === oldCategory ? { ...category, skills: category.skills.filter((item) => item.name !== oldName) } : category);
    }
    const targetIndex = categories.findIndex((category) => category.name === targetCategory);
    if (targetIndex >= 0 && categories[targetIndex].skills.some((item) => item.name.toLowerCase() === skill.name.toLowerCase())) {
      setMessage('That skill already exists in this category.');
      return;
    }
    if (targetIndex >= 0) categories[targetIndex] = { ...categories[targetIndex], skills: [...categories[targetIndex].skills, skill] };
    else categories.push({ name: targetCategory, skills: [skill] });
    onChange(categories);
    setMessage('');
    beginSkill(targetCategory);
  }

  function removeSkill(categoryName: string, skillName: string) {
    onChange(content.skillCategories.map((category) => category.name === categoryName ? { ...category, skills: category.skills.filter((skill) => skill.name !== skillName) } : category));
    if (editingKey === `${categoryName}\n${skillName}`) beginSkill(categoryName);
  }

  function renameCategory(previousName: string, name: string) {
    const nextName = name.trim();
    if (!nextName || content.skillCategories.some((category) => category.name !== previousName && category.name.toLowerCase() === nextName.toLowerCase())) return;
    onChange(content.skillCategories.map((category) => category.name === previousName ? { ...category, name: nextName } : category));
    if (form.category === previousName) setForm((current) => ({ ...current, category: nextName }));
    if (editingKey?.startsWith(`${previousName}\n`)) setEditingKey(`${nextName}\n${editingKey.split('\n')[1]}`);
  }

  return <div className="skills-editor">
    <div className="skills-editor__categories">
      {content.skillCategories.map((category, index) => <section className="skills-editor__category" key={index}>
        <label className="admin-field"><span>Category name</span><input value={category.name} onChange={(event) => renameCategory(category.name, event.target.value)} /></label>
        <ul>{category.skills.map((skill) => <li key={skill.name}>
          <button type="button" className="skills-editor__skill" onClick={() => beginSkill(category.name, skill)}><strong>{skill.name}</strong><span>{skill.evidence} · {skill.evidenceIds.length} linked</span></button>
          <button type="button" className="admin-delete-button" aria-label={`Remove ${skill.name}`} onClick={() => removeSkill(category.name, skill.name)}>Remove</button>
        </li>)}</ul>
        <button className="admin-add-button" type="button" onClick={() => beginSkill(category.name)}>＋ Add skill</button>
        <button className="admin-delete-button skills-editor__remove-category" type="button" onClick={() => onChange(content.skillCategories.filter((item) => item.name !== category.name))}>Remove category</button>
      </section>)}
    </div>
    <form className="admin-form admin-editor skill-editor-form" onSubmit={applySkill}>
      <div className="admin-editor__heading"><div><p className="eyebrow">{editingKey ? 'Edit evidence' : 'Add a skill'}</p><h3>{form.name || 'Skill details'}</h3></div></div>
      <div className="admin-form admin-form--grid">
        <TextField label="Skill name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} required />
        <label className="admin-field"><span>Evidence level</span><select value={form.evidence} onChange={(event) => setForm((current) => ({ ...current, evidence: event.target.value as EvidenceLevel }))}><option>Demonstrated</option><option>Practical familiarity</option><option>Exploring</option></select></label>
        <label className="admin-field"><span>Category</span><select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value, newCategory: '' }))}><option value="">Choose a category</option>{content.skillCategories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}</select></label>
        <TextField label="Or create category" value={form.newCategory} onChange={(value) => setForm((current) => ({ ...current, newCategory: value, category: '' }))} />
        <TextField className="admin-field--wide" label="Evidence IDs · comma separated" value={form.evidenceIds} onChange={(value) => setForm((current) => ({ ...current, evidenceIds: value }))} hint={evidenceOptions.length ? `Available: ${evidenceOptions.map((item) => `${item.id} (${item.label})`).join('; ')}` : 'Add a project or experience first.'} />
        <TextField className="admin-field--wide" label="Evidence note" value={form.evidenceNote} onChange={(value) => setForm((current) => ({ ...current, evidenceNote: value }))} />
      </div>
      {message && <p className="admin-inline-message is-error" role="alert">{message}</p>}
      <div className="admin-form-actions"><button className="button button--dark" type="submit">Apply skill to draft</button></div>
    </form>
  </div>;
}

function parseLines(value: string) {
  return value.split('\n').map((line) => line.trim()).filter(Boolean);
}

function isAllowedImageUrl(value: string) {
  const source = value.trim();
  if (!source) return true;
  if (source.startsWith('/') && !source.startsWith('//')) return true;
  try { return new URL(source).protocol === 'https:'; } catch { return false; }
}

function isAllowedLink(value?: string) {
  const href = value?.trim() ?? '';
  if (href.startsWith('/') && !href.startsWith('//')) return true;
  try { return ['https:', 'http:', 'mailto:'].includes(new URL(href).protocol); } catch { return false; }
}

function validateContent(content: PortfolioContent): string | null {
  const info = content.personalInfo;
  if (!info.name.trim() || !info.title.trim() || !info.summary.trim() || !info.email.trim()) return 'Profile name, professional title, summary, and email are required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email.trim())) return 'Enter a valid contact email.';
  if (![info.github, info.linkedin].every((value) => !value.trim() || /^https:\/\//i.test(value.trim()))) return 'GitHub and LinkedIn links must use HTTPS.';
  if (info.profileImage && !isAllowedImageUrl(info.profileImage)) return 'Profile image must use HTTPS or an existing site path starting with /.';

  const projectIds = content.projects.map((project) => project.id.trim());
  const projectSlugs = content.projects.map((project) => project.slug.trim());
  if (projectIds.some((id) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) || new Set(projectIds).size !== projectIds.length) return 'Every project needs a unique lowercase ID (letters, numbers, and hyphens).';
  if (projectSlugs.some((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) || new Set(projectSlugs).size !== projectSlugs.length) return 'Every project needs a unique lowercase URL slug (letters, numbers, and hyphens).';
  if (content.projects.some((project) => !project.title.trim() || !project.tagline.trim() || !project.description.trim() || !project.categories.some((category) => category.trim()) || !project.platforms.some((platform) => platform.trim()))) return 'Each project needs a title, tagline, description, category, and platform.';
  for (const project of content.projects) {
    const images = [project.thumbnail, project.heroImage, project.architecture?.diagram, ...(project.gallery?.map((image) => image.src) ?? [])].filter((image): image is string => Boolean(image));
    if (images.some((image) => !isAllowedImageUrl(image))) return `Check the image URL for ${project.title}; use HTTPS or an existing site path.`;
    if (project.links?.some((link) => !isAllowedLink(link.href))) return `Check the links for ${project.title}; use HTTPS, HTTP, mailto, or a site path.`;
  }

  const experienceIds = content.experiences.map((experience) => experience.id.trim());
  if (experienceIds.some((id) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) || new Set(experienceIds).size !== experienceIds.length) return 'Every experience needs a unique lowercase ID (letters, numbers, and hyphens).';
  if (content.experiences.some((experience) => !experience.organization.trim() || !experience.position.trim() || !experience.summary.trim())) return 'Each experience needs an organization, position, and summary.';

  const categories = content.skillCategories.map((category) => category.name.trim().toLowerCase());
  if (categories.some((name) => !name) || new Set(categories).size !== categories.length) return 'Skill categories must have unique names.';
  const validEvidence = new Set([...projectIds, ...experienceIds]);
  for (const category of content.skillCategories) {
    const skillNames = category.skills.map((skill) => skill.name.trim().toLowerCase());
    if (skillNames.some((name) => !name) || new Set(skillNames).size !== skillNames.length) return `Skills in “${category.name}” need unique names.`;
    if (category.skills.some((skill) => skill.evidenceIds.some((id) => !validEvidence.has(id)))) return `Review evidence links in “${category.name}”; one or more project or experience IDs do not exist.`;
    if (category.skills.some((skill) => !skill.evidenceIds.length && !skill.evidenceNote?.trim())) return `Add an evidence note or link for each skill in “${category.name}”.`;
  }
  return null;
}

function cloneContent(content: PortfolioContent): PortfolioContent {
  return JSON.parse(JSON.stringify(content)) as PortfolioContent;
}
