---
name: seed-data
description: Onboarding skill to seed initial development catalog data into SQLite (farmart.db) for Farmart eCommerce platform.
---

# Seed Data Onboarding Skill

Use this skill whenever onboarding a new developer or resetting the local development environment for the Farmart grocery platform.

## Overview

Farmart uses an embedded SQLite database (`farmart.db`) managed via `better-sqlite3`. The database stores:
- **Categories**: 8 grocery taxonomy categories with Lucide icon references and item counts.
- **Brands**: 4 featured producer brands with promotional copy and theme badges.
- **Banners**: 2 promotional hero and side advertising banners.
- **Products**: 6 initial catalog items with prices, ratings, inventory stock, and deal flags.

## Prerequisites

- Node.js 18+ (tested on Node 20 / 22 / 24)
- SQLite3 native bindings (`better-sqlite3` in `node_modules`)

## Quick Start / Seeding Command

Run the seed script via npm:

```bash
npm run db:seed
```

Or run directly with Node:

```bash
node scripts/seed-data.mjs
```

### Reset & Clean Re-seed

To drop existing tables and recreate them from scratch:

```bash
node scripts/seed-data.mjs --reset
```

## Seeded Data Reference

| Table | Count | Key Fields | Purpose |
|---|---|---|---|
| `categories` | 8 | `id`, `slug`, `name`, `icon` | Category browser & filter navigation |
| `brands` | 4 | `id`, `name`, `promo_text`, `image_url` | Featured brands section on home page |
| `banners` | 2 | `id`, `title`, `type`, `button_text` | Hero carousel & promotional cards |
| `products` | 6 | `id`, `title`, `price`, `rating`, `total_stock` | Catalog cards, top savers, & product detail views |

## Verification

After seeding, verify the database records:

```bash
node -e "
const db = require('better-sqlite3')('./farmart.db');
console.log('Categories:', db.prepare('SELECT COUNT(*) as c FROM categories').get().c);
console.log('Products:', db.prepare('SELECT COUNT(*) as c FROM products').get().c);
"
```
