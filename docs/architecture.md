# Architecture Blueprint

## 1) High-Level System Design

```text
[ Browser / Inertia React ]
            |
            v
[ Laravel Web + API Layer ]
   |      |      |
   |      |      +--> [ Redis Cache/Queues ]
   |      +---------> [ Notifications / Mail ]
   +---------------> [ PostgreSQL ]
```

- **Inertia React** renders app pages and dashboard experiences.
- **Laravel** handles routing, authorization, validation, and business workflows.
- **PostgreSQL** stores core entities and analytics events.
- **Redis** supports caching, throttling, and queue-backed jobs.

## 2) Domain Modules

### Projects
- CRUD with draft/published state
- Technology tags for filtering
- Featured image + external links (demo/repo)

### Blog
- Rich content storage (Markdown or structured editor output)
- Slug uniqueness + canonical URLs
- Status workflow: draft -> published

### Analytics
- Event capture middleware for anonymous page visits
- Daily aggregates for dashboard cards/charts
- Top content and referrer metrics

### Contact
- Form endpoint with reCAPTCHA + throttling
- Message table + admin review state
- Notification email pipeline

## 3) Security & Reliability Baseline

- CSRF/session hardening via Laravel defaults
- Route-level auth and policy checks for all admin actions
- Input validation with Form Requests
- Rate limit contact and login endpoints
- Queue email and heavy reporting work
- Add audit log records for sensitive writes

## 4) Deployment Topology

- **App:** Laravel app hosted on Railway/DO App Platform
- **DB:** Managed PostgreSQL instance
- **Cache/Queue:** Managed Redis instance
- **Static assets:** Built by Vite, served by app/CDN
- **Error monitoring:** Sentry

## 5) Suggested Directory Conventions (Laravel)

```text
app/
  Actions/
  Domain/
    Projects/
    Blog/
    Analytics/
    Contact/
  Policies/
  Http/
    Controllers/
    Requests/
resources/js/
  Pages/
  Components/
  Layouts/
```
