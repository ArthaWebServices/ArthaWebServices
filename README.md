# L_page

Agency landing page split into two services:

| Service | Stack | Port | Location |
|---------|-------|------|----------|
| **Frontend** | Next.js 15 (App Router) + Tailwind | `3000` | `frontend/` |
| **Backend** | Hono + TypeScript (`@hono/node-server`) | `4000` | `backend/` |

## Quick start

```bash
npm install                 # root dev tooling (concurrently)
npm --prefix frontend install
npm --prefix backend install

npm run dev                 # runs backend + frontend together
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

Or run them separately:

```bash
npm run dev:frontend   # Next.js on :3000
npm run dev:backend    # Hono API on :4000
```

## How the form works

The **Start a project** form (`frontend/app/start-a-project/page.tsx`) collects
name, email, phone (opt), company (opt), project description, and attachments
(file upload / Google Docs URL / Dropbox URL). On submit it POSTs
multipart/form-data to the backend:

```
POST http://localhost:4000/api/project
```

The backend validates required fields and **logs the submission to its server
console** (a stub — nothing is persisted or emailed yet). The frontend learns
the backend URL from `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000`;
see `frontend/.env.example`).

## Wiring real delivery

To actually receive submissions, edit `backend/src/index.ts` — the route already
parses all fields and file bytes (`file.arrayBuffer()`). Connect Resend/Nodemailer
for email, a database, or a CRM.

## Scripts

- `npm run dev` — run both services
- `npm run typecheck` — typecheck frontend + backend
- `npm run build` — production build of the frontend

## Layout

```
frontend/   Next.js site (app/, components/, data/, lib/, public/)
backend/    Hono API server (src/index.ts)
```
