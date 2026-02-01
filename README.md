# Mobile Video Editor (PWA)

A production-ready, mobile-first Progressive Web App demo that provides a simple online video editor with basic trimming UI, mock export, and an admin dashboard.

## Tech stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- lucide-react for icons

## Features
- Mobile-first responsive UI with bottom navigation
- Video upload, preview, trim UI (mocked export)
- Projects list
- Mock local auth (email + role stored in localStorage)
- Admin dashboard with role-based access (mock data)
- PWA manifest + icons

## Setup
1. Install dependencies

   npm install

2. Run dev server

   npm run dev

3. Build for production

   npm run build

## Notes & tradeoffs
- Video trimming export is mocked (downloads the original file). Real client-side re-encoding is complex and would require WebCodecs or server-side transcoding; this demo focuses on UX and structure.
- Authentication is client-only (mock). For production use, integrate NextAuth or a proper backend.

## Deploy
This project is compatible with Vercel. Push to GitHub and import the repo in Vercel.

## Environment
- See `.env.example` for variables. No secrets are committed.

## Continuous Integration (CI) ⚙️
- A GitHub Actions workflow was prepared to run `npm ci` and `npm run build` on pushes to `main`.
- Note: pushing workflow files can be rejected if your GitHub token lacks the `workflow` scope. If the workflow doesn't appear in this repo, add the workflow file manually at `.github/workflows/ci.yml` with the following contents:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Run lint (optional)
        run: npm run lint || true
```

- Vercel: This project is compatible with Vercel. Connect the GitHub repository to Vercel for automatic deployments on push.
