const appState = {
  activeView: "dashboard",
  projects: [
    { title: "Sales Analytics App", tech: ["Laravel", "React"], status: "Published" },
    { title: "Hiring Portal", tech: ["Next.js", "PostgreSQL"], status: "Draft" },
    { title: "CRM Dashboard", tech: ["Inertia", "Tailwind"], status: "Published" }
  ],
  blogPosts: [
    { title: "Building RBAC in Laravel", status: "Published", readTime: 7 },
    { title: "Creating SEO-Friendly Project Pages", status: "Draft", readTime: 5 },
    { title: "Tracking Visits with Middleware", status: "Published", readTime: 6 }
  ],
  contacts: [
    { name: "Alex", email: "alex@example.com", subject: "Project inquiry", status: "new" },
    { name: "Priya", email: "priya@example.com", subject: "Freelance opportunity", status: "replied" }
  ],
  visits: [210, 280, 240, 350, 390, 420, 500],
};

const views = [
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog CMS" },
  { id: "contact", label: "Contact Inbox" }
];

const navEl = document.querySelector("#nav");
const viewEl = document.querySelector("#view");
const pageTitleEl = document.querySelector("#page-title");
const metricTemplate = document.querySelector("#metric-card-template");

function mountNav() {
  navEl.innerHTML = "";
  views.forEach((view) => {
    const button = document.createElement("button");
    button.className = `nav-item ${appState.activeView === view.id ? "active" : ""}`;
    button.textContent = view.label;
    button.addEventListener("click", () => {
      appState.activeView = view.id;
      render();
    });
    navEl.appendChild(button);
  });
}

function createMetric(label, value, subtext = "") {
  const node = metricTemplate.content.cloneNode(true);
  node.querySelector(".metric-label").textContent = label;
  node.querySelector(".metric-value").textContent = value;
  node.querySelector(".metric-subtext").textContent = subtext;
  return node;
}

function renderDashboard() {
  const wrapper = document.createElement("div");
  wrapper.className = "grid";

  const metricGrid = document.createElement("section");
  metricGrid.className = "grid metrics";
  metricGrid.appendChild(createMetric("Projects", appState.projects.length, "2 published"));
  metricGrid.appendChild(createMetric("Blog posts", appState.blogPosts.length, "2 published"));
  metricGrid.appendChild(createMetric("Messages", appState.contacts.length, "1 unread"));
  metricGrid.appendChild(createMetric("Total page views", appState.visits.reduce((a, b) => a + b, 0), "Last 7 days"));

  const insights = document.createElement("section");
  insights.className = "card";
  insights.innerHTML = `
    <h3>Traffic trend (7 days)</h3>
    <p class="muted">Simple visualization using proportional bars.</p>
    <div class="list">
      ${appState.visits
        .map((v, i) => {
          const max = Math.max(...appState.visits);
          const width = Math.round((v / max) * 100);
          return `<div class="list-item"><strong>Day ${i + 1}:</strong> ${v}
            <div style="height:8px;background:var(--border);border-radius:999px;margin-top:6px;">
              <div style="height:100%;width:${width}%;background:var(--accent);border-radius:999px;"></div>
            </div>
          </div>`;
        })
        .join("")}
    </div>
  `;

  wrapper.append(metricGrid, insights);
  return wrapper;
}

function renderProjects() {
  const container = document.createElement("div");
  container.className = "card";

  const rows = appState.projects
    .map(
      (project) => `
      <tr>
        <td>${project.title}</td>
        <td>${project.tech.map((t) => `<span class="pill">${t}</span>`).join("")}</td>
        <td>${project.status}</td>
      </tr>
    `
    )
    .join("");

  container.innerHTML = `
    <h3>Projects</h3>
    <p class="muted">Filter-ready project list for admin management.</p>
    <table class="table">
      <thead><tr><th>Title</th><th>Tech</th><th>Status</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  return container;
}

function renderBlog() {
  const wrapper = document.createElement("div");
  wrapper.className = "kpi-row";

  const list = document.createElement("section");
  list.className = "card";
  list.innerHTML = `
    <h3>Blog Posts</h3>
    <div class="list">
      ${appState.blogPosts
        .map(
          (post) => `<div class="list-item"><strong>${post.title}</strong><br/>
            <span class="muted">${post.status} · ${post.readTime} min read</span>
          </div>`
        )
        .join("")}
    </div>
  `;

  const editor = document.createElement("section");
  editor.className = "card";
  editor.innerHTML = `
    <h3>Quick Draft</h3>
    <form id="draft-form">
      <label>Title <input name="title" required /></label>
      <label>Status
        <select name="status">
          <option>Draft</option>
          <option>Published</option>
        </select>
      </label>
      <label>Excerpt <textarea name="excerpt" rows="4"></textarea></label>
      <button class="btn" type="submit">Save Draft</button>
    </form>
    <p id="draft-message" class="muted"></p>
  `;

  wrapper.append(list, editor);
  setTimeout(() => {
    const form = document.querySelector("#draft-form");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const title = data.get("title")?.toString().trim();
      const status = data.get("status")?.toString() || "Draft";
      if (!title) return;
      appState.blogPosts.unshift({ title, status, readTime: 4 });
      const message = document.querySelector("#draft-message");
      message.textContent = `Saved: ${title}`;
      form.reset();
      render();
    });
  }, 0);

  return wrapper;
}

function renderContact() {
  const wrapper = document.createElement("div");
  wrapper.className = "kpi-row";

  const inbox = document.createElement("section");
  inbox.className = "card";
  inbox.innerHTML = `
    <h3>Inbox</h3>
    <div class="list">
      ${appState.contacts
        .map(
          (item) => `<div class="list-item"><strong>${item.subject}</strong><br />
             ${item.name} (${item.email})<br />
             <span class="muted">Status: ${item.status}</span>
          </div>`
        )
        .join("")}
    </div>
  `;

  const formPanel = document.createElement("section");
  formPanel.className = "card";
  formPanel.innerHTML = `
    <h3>Reply Simulator</h3>
    <form id="reply-form">
      <label>Email <input name="email" type="email" required/></label>
      <label>Message <textarea name="message" rows="6" required></textarea></label>
      <button class="btn" type="submit">Send Reply</button>
    </form>
    <p class="muted" id="reply-message"></p>
  `;

  wrapper.append(inbox, formPanel);
  setTimeout(() => {
    const form = document.querySelector("#reply-form");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = new FormData(form).get("email");
      document.querySelector("#reply-message").textContent = `Reply sent to ${email}`;
      form.reset();
    });
  }, 0);

  return wrapper;
}

function render() {
  mountNav();
  viewEl.innerHTML = "";

  switch (appState.activeView) {
    case "projects":
      pageTitleEl.textContent = "Projects";
      viewEl.appendChild(renderProjects());
      break;
    case "blog":
      pageTitleEl.textContent = "Blog CMS";
      viewEl.appendChild(renderBlog());
      break;
    case "contact":
      pageTitleEl.textContent = "Contact Inbox";
      viewEl.appendChild(renderContact());
      break;
    default:
      pageTitleEl.textContent = "Dashboard";
      viewEl.appendChild(renderDashboard());
  }
}

const themeToggle = document.querySelector("#theme-toggle");
const initialTheme = localStorage.getItem("theme") || "light";
if (initialTheme === "dark") document.body.classList.add("dark");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

render();
