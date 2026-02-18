# Portfolio Management Panel

A runnable front-end prototype of an advanced portfolio management panel.

## What is included

- Sidebar navigation between key modules:
  - Dashboard
  - Projects
  - Blog CMS
  - Contact Inbox
- Dashboard KPI cards + lightweight 7-day traffic visualization
- Projects table with tech tags/status
- Blog CMS quick-draft form (client-side state)
- Contact inbox + reply simulator
- Dark/light mode toggle (persisted to `localStorage`)

## Run locally

Because this is a static app, you can run it with any simple HTTP server:

```bash
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173`

## Project files

- `index.html` — app shell and templates
- `styles.css` — design system + responsive styles
- `app.js` — module rendering, in-memory data, interactions
- `docs/` — architecture blueprint, schema starter, and roadmap
