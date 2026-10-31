# Brian Anashari — Portfolio

React 18, TypeScript, and Vite portfolio for a software engineer specializing in mobile and AI.

## Develop

Requirements: Node.js 20.19+ (Node 24 is used in CI) and npm.

```sh
npm ci
npm run dev
```

## Validate

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Content model

The admin at `/my-portofolio/admin` manages profile details, project case studies, experience, and evidence-linked skills. Content is stored in Supabase and read by the public site. Until Supabase is configured or initialized, the site uses the bundled defaults from `src/data/portfolioData.ts`. A project can have multiple categories and optional case-study content. Every project uses `/projects/:slug`; optional sections and links render only when their data is present.

### Configure the online admin

1. Create a Supabase project and run the SQL files in `supabase/migrations/` in order: first `202611080001_portfolio_cms.sql`, then `202611110001_portfolio_image_storage.sql`. If the CMS migration is already applied, run only the new image-storage migration.
2. Disable **Allow new users to sign up** in [Supabase Auth general configuration](https://supabase.com/docs/guides/auth/general-configuration), then create Brian's admin user manually. The site has no sign-up flow.
3. Copy that user's UUID from **Authentication → Users**, then add membership in the SQL Editor:

   ```sql
   insert into public.portfolio_admins (user_id)
   values ('PASTE-THE-USER-UUID-HERE');
   ```

4. Copy the project URL and publishable key into a local `.env.local` file using `.env.example` as the template. For GitHub Pages, add repository Actions secrets named `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; the deploy workflow passes them to the Vite build.
5. Deploy the site, open `/my-portofolio/admin`, sign in, and choose **Initialize from current portfolio** once. After initialization, edits stay in the draft until **Save & publish** is selected.

The publishable key is intended for browser use. Never put a Supabase `service_role` or secret key in a `VITE_*` variable. Public reads and admin-only writes are enforced by database grants and Row Level Security in the migration. Admin account creation and membership are managed in the Supabase dashboard/SQL Editor.

Project images can use public HTTPS URLs, existing built site asset paths, or the admin's file uploader. Uploaded files are stored in the public `portfolio-images` Supabase Storage bucket; RLS allows uploads only to portfolio admins. Public visitors can view uploaded images. The editor saves their public URLs with the portfolio content. Uploading a replacement does not delete the previous file.

Review screenshots for private content and verify project claims before publishing.

## GitHub Pages

Vite builds for the repository path `/my-portofolio/`. The workflow in `.github/workflows/deploy.yml` runs lint, type checking, and build before deploying the Pages artifact when `main` is updated. `public/404.html` preserves direct application routes on GitHub Pages.

If the Pages custom workflow has not been selected yet, set the repository Pages source to **GitHub Actions**.
