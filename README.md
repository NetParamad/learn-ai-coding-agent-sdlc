# Learn AI Coding Agent SDLC (Farmart Storefront)

Educational and practical reference project demonstrating modern software development lifecycle (SDLC) driven by autonomous AI coding agents.

Features a full-stack e-commerce grocery storefront ("Farmart") built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **SQLite (better-sqlite3)**, and **shadcn/ui** components.

---

## 🚀 Highlights

- **Developer Runbook**: Detailed architecture and guidelines in [instruction.md](file:///Users/netparamad/Documents/GitHub/learn-ai-coding-agent-sdlc/instruction.md).
- **Design System Spec**: Fully defined design tokens in [DESIGN.md](file:///Users/netparamad/Documents/GitHub/learn-ai-coding-agent-sdlc/DESIGN.md) (Farmart Amber `#fbbf24`, warm Stone-900 typography, accessible WCAG contrast).
- **Domain & Architecture**: Documented in [GLOSSARY.md](file:///Users/netparamad/Documents/GitHub/learn-ai-coding-agent-sdlc/GLOSSARY.md) and `docs/adr/`.
- **Database ER Diagram**: Interactive schema rendered at `http://localhost:3000/mermaid.html` (exported to [mermaid.html](file:///Users/netparamad/Documents/GitHub/learn-ai-coding-agent-sdlc/mermaid.html)).
- **Interactive API Docs**: Swagger OpenAPI 3.0.3 docs available at `http://localhost:3000/docs`.
- **Edge Cases & Mitigations**: Comprehensive risk analysis in [docs/EDGE_CASES.md](file:///Users/netparamad/Documents/GitHub/learn-ai-coding-agent-sdlc/docs/EDGE_CASES.md).
- **Automated Verification**: Unit & Integration tests via Node.js native test runner and E2E regression tests via Playwright.

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Seed SQLite database (categories, brands, products, banners)
npm run db:seed

# Start development server
npm run dev

# Run unit & integration tests
npm test

# Run Playwright E2E regression tests
npm run test:e2e

# Run linting check
npm run lint

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

MIT
