# Farmart Storefront — Edge Case Analysis & Mitigations

This document catalogs identified edge cases across the Farmart full-stack Next.js + SQLite architecture, analyzing impact, risk level, current status, and recommended mitigations.

---

## 1. Search & Input Handling

| Edge Case | Risk | Current Handling | Hardening Recommendation |
| :--- | :--- | :--- | :--- |
| **SQL Injection (SQLi)** in search keyword | Critical | Mitigated. Uses parameterized SQLite statements (`title LIKE ? OR brand LIKE ?`) via `better-sqlite3`. | Maintain parameterized prepared statements across all new query paths. |
| **SQL LIKE Wildcard Exploitation** (`%` or `_`) | Low | User typing `%` or `_` matches all products or any single character due to unescaped `LIKE` syntax. | Escape `%` and `_` characters in query string using `ESCAPE '\'` syntax. |
| **Unicode & Non-ASCII Case Sensitivity** | Medium | SQLite default `LIKE` is only ASCII case-insensitive. Diacritics or non-ASCII characters may not match insensitively without ICU extension. | Normalize strings with `COLLATE NOCASE` or lowercase strings before query comparison. |
| **Whitespace-only Search** (`"   "`) | Low | Handled. `searchQuery.trim()` prevents empty requests and returns empty suggestions. | Guard API routes to return default catalog or 400 when query is only whitespace. |
| **Excessively Long Query Strings** (>1,000 chars) | Medium | Handled partially by Next.js URL limits, but could strain query parsing. | Truncate search input to 100 characters in both frontend and backend (`q.slice(0, 100)`). |
| **Reflected Cross-Site Scripting (XSS)** | High | Mitigated. React JSX auto-escapes dynamic text renderings in `/search` and Header dropdown. | Never use `dangerouslySetInnerHTML` on user query strings. |
| **Network Race Condition in Live Search** | Low | Debounced (250ms). If rapid subsequent requests arrive out of order, older results could overwrite newer ones. | Use `AbortController` in `useEffect` cleanup to cancel inflight fetch requests. |

---

## 2. Database & Data Integrity

| Edge Case | Risk | Current Handling | Hardening Recommendation |
| :--- | :--- | :--- | :--- |
| **SQLite Concurrency & WAL Contention** | Medium | `better-sqlite3` configured with `WAL` mode (`PRAGMA journal_mode = WAL`). | For high concurrency or multi-process deployments, configure `PRAGMA busy_timeout = 5000`. |
| **Non-Existent Product IDs** (`/products/xyz-999`) | Medium | Handled. API returns `404` status with JSON error; frontend shows friendly 404 UI. | Maintain Next.js `notFound()` boundary for static pages. |
| **Floating-Point Currency Inaccuracies** | Medium | Prices stored as `REAL` (e.g. `48.50`). Multi-item cart totals can produce floating point rounding errors (`0.1 + 0.2 = 0.30000000000000004`). | Store monetary values in integer cents (`price_cents INTEGER`) in future schema iterations. |
| **Concurrent Inventory Depletion** | High | Schema tracks boolean `is_in_stock INTEGER`. No inventory count column exists. | Add `stock_quantity INTEGER CHECK(stock_quantity >= 0)` with transactional decrement upon checkout. |
| **Missing Foreign Key Enforcement** | Medium | `better-sqlite3` requires explicit `PRAGMA foreign_keys = ON` on connection open. | Ensure `db.pragma('foreign_keys = ON')` runs on every connection initialization in `lib/db.ts`. |

---

## 3. Frontend & Responsive UI

| Edge Case | Risk | Current Handling | Hardening Recommendation |
| :--- | :--- | :--- | :--- |
| **Theme Flash / Hydration Mismatch** | Low | Handled. Client components verify `mounted` state before rendering theme icons. | Continue using `next-themes` standard provider pattern. |
| **Empty Search Results / Zero Matches** | Low | Handled. `/search` renders an empty state illustration with "Clear search" action. | Provide category quick-links in empty state to guide users back to shopping. |
| **Broken Product Image URLs** | Low | Handled. Fallback icon placeholder rendered when product images fail. | Implement `next/image` with SVG/Lucide fallback component for all image cards. |
| **Mobile Drawer Viewport Lock** | Low | Handled. Vaul / Radix dialog handles body scroll locking and backdrop dismiss. | Verify accessibility focus trap on low-end touch devices. |
| **Deep Link with Malformed Query Params** | Low | Handled. `searchParams` gracefully handles null/undefined values and defaults to page 1 / all categories. | Enforce Zod validation on API route query params. |

---

## 4. API & Protocol Contracts

| Edge Case | Risk | Current Handling | Hardening Recommendation |
| :--- | :--- | :--- | :--- |
| **Extreme Pagination Offsets** (`offset=9999999`) | Low | Handled. SQLite returns empty array `[]` with `total` count; no crash. | Enforce max offset threshold (`offset <= 10000`) or cursor-based pagination. |
| **Negative Limits or Offsets** (`limit=-10`) | Medium | SQLite may reject or behave unexpectedly with negative limits without offset. | Clamp limit (`Math.max(1, Math.min(100, limit))`) and offset (`Math.max(0, offset)`). |
| **Missing or Malformed Swagger Spec** | Low | Handled. `/docs/swagger.json` statically served from `docs/` and public assets. | Add automated contract testing against OpenAPI schema in CI. |
