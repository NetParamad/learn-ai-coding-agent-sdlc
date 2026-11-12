---
name: farmart-project
description: Living skill document tracking architecture, App routes, API endpoints, SQLite schema, design tokens, and testing gates for Farmart Storefront.
---

# Farmart Storefront — Project Skill Document

> Living operational document automatically synchronized by `scripts/sync-project-skill.mjs`.
> **Last Synced**: 2026-11-12T16:04:41.618Z  
> **Git Reference**: `1b1a2bb` (branch `main`)

---

## 1. Project Overview & Identity

- **Platform**: Farmart Grocery & Fresh Market E-Commerce Storefront
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4, Lucide React icons, and Radix UI primitives
- **Database**: SQLite (`farmart.db`) powered by `better-sqlite3` in WAL mode
- **Theme & Design**: Farmart Amber (`#fbbf24`), warm Stone neutrals, accessible WCAG AA contrast (documented in `DESIGN.md`)
- **Deployment**: Vercel Serverless (Node.js 22.x runtime with auto `/tmp` SQLite replication)

---

## 2. Discovered Routes & Endpoints

### Storefront Pages (5 Pages)
- `/`
- `/docs`
- `/product/[id]`
- `/products/[id]`
- `/search`

### REST API Endpoints (6 Endpoints)
- `/api/banners`
- `/api/brands`
- `/api/categories`
- `/api/products`
- `/api/products/[id]`
- `/docs/swagger.json`

- **Interactive Swagger UI**: Served at `/docs`
- **OpenAPI 3.0.3 Spec**: Available at `/docs/swagger.json`
- **Database Mermaid Diagram**: Interactive visual at `/mermaid.html`

---

## 3. Component Architecture (122 Components)

| Component Area | Count | Path | Description |
| :--- | :--- | :--- | :--- |
| **UI Primitives** | 102 | `components/ui/` | Radix primitives (Button, Card, Dialog, Drawer, Carousel, etc.) |
| **Storefront Sections** | 8 | `components/sections/` | Header, Hero, CategoryBrowser, ProductDetail, Footer |
| **Design System Registry** | 12 | `components/design-system/` | Interactive design catalog and live preview blocks |

---

## 4. Database Schema & Seed Data

Database file: `farmart.db` (WAL mode enabled, `busy_timeout = 5000`, `foreign_keys = ON`)

| Table Name | Current Row Count |
| :--- | :--- |
| `categories` | 8 records |
| `brands` | 4 records |
| `products` | 6 records |
| `banners` | 2 records |

### Seeding Command
```bash
npm run db:seed
```

---

## 5. Verification & Testing Suites

| Test Suite | Files | Runner | Target |
| :--- | :--- | :--- | :--- |
| **Unit Tests** | 1 | Node Test Runner | SQLite queries, parameterization, empty handling |
| **Integration Tests** | 1 | Node Test Runner | Next.js API Routes (`/api/products`, `/api/categories`, etc.) |
| **End-to-End Tests** | 1 | Playwright | Full browser flows: Home, Search, Detail, Swagger, Mermaid |

### Verification Commands
```bash
npm run lint       # ESLint 9 Flat Config (Must exit 0)
npm test           # Unit & Integration tests (Must exit 0)
npm run test:e2e   # Playwright E2E regression tests (Must exit 0)
```

---

## 6. Guardrails & Safety Hooks

- **PreToolUse Hook**: `.claude/hooks/block-dangerous-commands.sh`
  - Blocks `rm -rf`, `git push --force`, and `git push -f`
- **Edge Cases Catalog**: `docs/EDGE_CASES.md`
- **Vercel Serverless Handler**: `lib/db.ts` (`getDbPath()` duplicates DB to `/tmp` to guarantee write access)

---

## 7. Synchronization Loop

This skill is kept up-to-date every 5 minutes by the automated background cron schedule:
```bash
npm run skill:sync
```
