import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import Database from "better-sqlite3";

const ROOT_DIR = process.cwd();
const SKILL_DIR = path.join(ROOT_DIR, "skills", "farmart-project");
const SKILL_FILE = path.join(SKILL_DIR, "SKILL.md");
const DB_PATH = path.join(ROOT_DIR, "farmart.db");

function getGitInfo() {
  try {
    const commit = execSync("git rev-parse --short HEAD", { cwd: ROOT_DIR }).toString().trim();
    const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT_DIR }).toString().trim();
    const lastCommitDate = execSync("git log -1 --format=%cd --date=iso", { cwd: ROOT_DIR }).toString().trim();
    return { commit, branch, lastCommitDate };
  } catch {
    return { commit: "unknown", branch: "main", lastCommitDate: new Date().toISOString() };
  }
}

function scanDir(dir, pattern, base = "") {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(base, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(scanDir(fullPath, pattern, relPath));
    } else if (pattern.test(entry.name)) {
      results.push(relPath);
    }
  }
  return results;
}

function getAppRoutes() {
  const appDir = path.join(ROOT_DIR, "app");
  const files = scanDir(appDir, /^(page|route)\.(tsx|ts|js|mjs)$/);
  const pages = [];
  const apis = [];

  for (const f of files) {
    const parsed = path.parse(f);
    let route = "/" + parsed.dir;
    if (route === "/.") route = "/";
    route = route.replace(/\\/g, "/");

    if (parsed.name === "route") {
      apis.push(route);
    } else {
      pages.push(route);
    }
  }

  pages.sort();
  apis.sort();
  return { pages, apis };
}

function getComponentCounts() {
  const compDir = path.join(ROOT_DIR, "components");
  const ui = scanDir(path.join(compDir, "ui"), /\.(tsx|ts)$/).length;
  const sections = scanDir(path.join(compDir, "sections"), /\.(tsx|ts)$/).length;
  const designSystem = scanDir(path.join(compDir, "design-system"), /\.(tsx|ts)$/).length;
  return { ui, sections, designSystem, total: ui + sections + designSystem };
}

function getDbMetrics() {
  if (!fs.existsSync(DB_PATH)) {
    return { tables: [] };
  }
  try {
    const db = new Database(DB_PATH, { readonly: true });
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
    const tableStats = tables.map((t) => {
      const count = db.prepare(`SELECT COUNT(*) as count FROM ${t.name}`).get();
      return { name: t.name, count: count.count };
    });
    db.close();
    return { tables: tableStats };
  } catch (err) {
    return { tables: [], error: err.message };
  }
}

function getTestMetrics() {
  const unit = scanDir(path.join(ROOT_DIR, "tests", "unit"), /\.test\.mjs$/).length;
  const integration = scanDir(path.join(ROOT_DIR, "tests", "integration"), /\.test\.mjs$/).length;
  const e2e = scanDir(path.join(ROOT_DIR, "e2e"), /\.spec\.ts$/).length;
  return { unit, integration, e2e };
}

export function generateSkillMarkdown() {
  const git = getGitInfo();
  const routes = getAppRoutes();
  const comps = getComponentCounts();
  const db = getDbMetrics();
  const tests = getTestMetrics();
  const now = new Date().toISOString();

  let dbTableRows = db.tables.map((t) => `| \`${t.name}\` | ${t.count} records |`).join("\n");
  if (!dbTableRows) dbTableRows = "| None / not seeded | 0 |";

  const pageList = routes.pages.map((p) => `- \`${p}\``).join("\n");
  const apiList = routes.apis.map((a) => `- \`${a}\``).join("\n");

  const content = `---
name: farmart-project
description: Living skill document tracking architecture, App routes, API endpoints, SQLite schema, design tokens, and testing gates for Farmart Storefront.
---

# Farmart Storefront — Project Skill Document

> Living operational document automatically synchronized by \`scripts/sync-project-skill.mjs\`.
> **Last Synced**: ${now}  
> **Git Reference**: \`${git.commit}\` (branch \`${git.branch}\`)

---

## 1. Project Overview & Identity

- **Platform**: Farmart Grocery & Fresh Market E-Commerce Storefront
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4, Lucide React icons, and Radix UI primitives
- **Database**: SQLite (\`farmart.db\`) powered by \`better-sqlite3\` in WAL mode
- **Theme & Design**: Farmart Amber (\`#fbbf24\`), warm Stone neutrals, accessible WCAG AA contrast (documented in \`DESIGN.md\`)
- **Deployment**: Vercel Serverless (Node.js 22.x runtime with auto \`/tmp\` SQLite replication)

---

## 2. Discovered Routes & Endpoints

### Storefront Pages (${routes.pages.length} Pages)
${pageList}

### REST API Endpoints (${routes.apis.length} Endpoints)
${apiList}

- **Interactive Swagger UI**: Served at \`/docs\`
- **OpenAPI 3.0.3 Spec**: Available at \`/docs/swagger.json\`
- **Database Mermaid Diagram**: Interactive visual at \`/mermaid.html\`

---

## 3. Component Architecture (${comps.total} Components)

| Component Area | Count | Path | Description |
| :--- | :--- | :--- | :--- |
| **UI Primitives** | ${comps.ui} | \`components/ui/\` | Radix primitives (Button, Card, Dialog, Drawer, Carousel, etc.) |
| **Storefront Sections** | ${comps.sections} | \`components/sections/\` | Header, Hero, CategoryBrowser, ProductDetail, Footer |
| **Design System Registry** | ${comps.designSystem} | \`components/design-system/\` | Interactive design catalog and live preview blocks |

---

## 4. Database Schema & Seed Data

Database file: \`farmart.db\` (WAL mode enabled, \`busy_timeout = 5000\`, \`foreign_keys = ON\`)

| Table Name | Current Row Count |
| :--- | :--- |
${dbTableRows}

### Seeding Command
\`\`\`bash
npm run db:seed
\`\`\`

---

## 5. Verification & Testing Suites

| Test Suite | Files | Runner | Target |
| :--- | :--- | :--- | :--- |
| **Unit Tests** | ${tests.unit} | Node Test Runner | SQLite queries, parameterization, empty handling |
| **Integration Tests** | ${tests.integration} | Node Test Runner | Next.js API Routes (\`/api/products\`, \`/api/categories\`, etc.) |
| **End-to-End Tests** | ${tests.e2e} | Playwright | Full browser flows: Home, Search, Detail, Swagger, Mermaid |

### Verification Commands
\`\`\`bash
npm run lint       # ESLint 9 Flat Config (Must exit 0)
npm test           # Unit & Integration tests (Must exit 0)
npm run test:e2e   # Playwright E2E regression tests (Must exit 0)
\`\`\`

---

## 6. Guardrails & Safety Hooks

- **PreToolUse Hook**: \`.claude/hooks/block-dangerous-commands.sh\`
  - Blocks \`rm -rf\`, \`git push --force\`, and \`git push -f\`
- **Edge Cases Catalog**: \`docs/EDGE_CASES.md\`
- **Vercel Serverless Handler**: \`lib/db.ts\` (\`getDbPath()\` duplicates DB to \`/tmp\` to guarantee write access)

---

## 7. Synchronization Loop

This skill is kept up-to-date every 5 minutes by the automated background cron schedule:
\`\`\`bash
npm run skill:sync
\`\`\`
`;

  if (!fs.existsSync(SKILL_DIR)) {
    fs.mkdirSync(SKILL_DIR, { recursive: true });
  }

  const existing = fs.existsSync(SKILL_FILE) ? fs.readFileSync(SKILL_FILE, "utf-8") : null;
  // Compare without timestamp line
  const stripTime = (str) => (str ? str.replace(/> \*\*Last Synced\*\*: .*\n/, "") : "");

  if (stripTime(existing) !== stripTime(content)) {
    fs.writeFileSync(SKILL_FILE, content, "utf-8");
    console.log(`[skill:sync] Updated ${SKILL_FILE} at ${now} (Commit: ${git.commit})`);
    return true;
  } else {
    console.log(`[skill:sync] No changes detected in codebase metadata at ${now}`);
    return false;
  }
}

if (process.argv[1] && process.argv[1].endsWith("sync-project-skill.mjs")) {
  generateSkillMarkdown();
}
