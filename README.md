# Portfolio Management Panel

Production-ready full-stack portfolio platform blueprint using **Laravel + Inertia + React + PostgreSQL**.

## Locked Stack

- **Frontend/UI:** Inertia.js + React (inside Laravel)
- **Styling:** Tailwind CSS
- **Backend/API:** Laravel 11+
- **Auth:** Laravel Sanctum + Fortify
- **DB:** PostgreSQL
- **Cache/Queue:** Redis
- **Charts:** Recharts
- **Spam Protection:** Google reCAPTCHA
- **Observability:** Laravel Telescope (local), Sentry (prod)

## Product Surface

### Public (SEO-first)
- Home
- Projects (filterable)
- Blog (pagination + tags/categories)
- About
- Contact
- Dynamic sitemap + robots.txt
- OpenGraph/Twitter metadata + JSON-LD structured data

### Auth + RBAC
Roles:
- Admin
- Editor
- Viewer

Core permissions:
- Project CRUD: Admin/Editor
- Blog publish: Admin/Editor
- User management: Admin
- Analytics view: Admin/Editor/Viewer

### Admin Dashboard
Widgets:
- Total Projects
- Blog Post Count
- Contact Messages
- Total Page Views
- Top Blog Post
- Traffic Trend (7/30/90 days)

### Blog CMS
- Draft/Published workflow
- Slug generation
- SEO metadata
- Category/tag taxonomy
- Featured image uploads
- Estimated read-time

### Contact Pipeline
- reCAPTCHA validation
- Rate limiting
- Message persistence
- Admin response workflow
- Optional auto-response email

## Documentation Index

- Architecture: [`docs/architecture.md`](docs/architecture.md)
- Database schema starter: [`docs/database-schema.sql`](docs/database-schema.sql)
- Build roadmap: [`docs/roadmap-30-days.md`](docs/roadmap-30-days.md)

## What to Build First

1. Bootstrap Laravel app + Inertia React + Tailwind
2. Implement auth + RBAC policies
3. Implement projects/blog modules
4. Add analytics tracking + dashboard aggregation
5. Finalize SEO metadata + deploy
