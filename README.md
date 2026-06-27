# Wendy Beauty Med Spa

A standalone React + Vite single-page application for Wendy Beauty Med Spa, ready for local development and Vercel deployment.

## Local Setup

1. Clone the repository.
2. Open the project directory.
3. Install dependencies:

```bash
npm install
```

4. Copy `.env.example` to `.env` and add your Formspree IDs.

```bash
cp .env.example .env
```

5. Start the development server:

```bash
npm run dev
```

6. Build for production:

```bash
npm run build
```

7. Preview the production build locally:

```bash
npm run preview
```

## Vercel Deployment

This project is configured as a static SPA build for Vercel. The output directory is the default `dist`, and the fallback rule in `vercel.json` rewrites all routes to `index.html` so client-side routing works for direct links like `/services` or `/contact`.

After connecting the repository in Vercel, add the following environment variables in the Vercel Project Settings → Environment Variables:

- `VITE_FORMSPREE_CONTACT_ID`
- `VITE_FORMSPREE_NEWSLETTER_ID`

These values come from your Formspree account for the contact form and newsletter signup form.

## Notes

- The app no longer depends on Base44 backend services.
- Images are centralized under `src/lib/images.js` and served from `public/images/`.
- Contact and newsletter forms are wired to Formspree via environment variables.
- `vercel.json` includes a rewrite rule for SPA routing.
