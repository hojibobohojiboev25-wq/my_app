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
