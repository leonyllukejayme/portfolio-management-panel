# Advanced Portfolio Management Panel

This repository now locks in a **production-ready Laravel + Inertia architecture** for an advanced portfolio platform.

## Locked-in Stack

- **Frontend:** Inertia.js + React + Vite
- **Styling:** Tailwind CSS
- **Backend API + Web App:** Laravel
- **Auth:** Laravel Sanctum + Laravel Fortify (2FA-ready)
- **Database:** PostgreSQL
- **Caching/Queues:** Redis
- **Charts/Analytics UI:** Recharts
- **Bot protection:** Google reCAPTCHA v3
- **Observability:** Laravel Telescope (dev), Sentry (prod)

## Why this stack

This keeps your preferred Laravel ecosystem while still showcasing modern React-driven UX and SPA-like dashboard behavior through Inertia.

## Core modules

1. Public SEO pages (Home, Projects, Blog, About, Contact)
2. RBAC auth (Admin / Editor / Viewer)
3. Admin dashboard widgets + traffic analytics
4. Blog CMS (draft/publish, tags, categories, SEO fields)
5. Contact pipeline (reCAPTCHA, rate-limit, persistence, admin reply)
6. Theme system (dark/light + system preference)

## Primary database tables

- users
- roles
- projects
- blog_posts
- categories
- tags
- contact_messages
- visits
- settings
- activity_logs

## 30-day execution outline

- **Week 1:** Project bootstrap, auth, RBAC, base schema
- **Week 2:** Public pages + projects + blog listing/detail + SEO basics
- **Week 3:** Admin CMS + dashboard charts + contact inbox
- **Week 4:** Hardening (rate limits, logging, soft deletes), QA, deployment

## Deployment target

- **App:** Laravel on Railway/DigitalOcean
- **DB:** Managed PostgreSQL
- **Assets/Edge:** Optional Cloudflare
- **Environments:** local / staging / production with separate `.env`

---

If you want, the next step is generating:

- concrete migration files,
- folder structure,
- and a phased issue backlog.
