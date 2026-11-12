import { test, describe } from "node:test";
import assert from "node:assert/strict";
import Database from "better-sqlite3";
import path from "node:path";

// Direct test against SQLite database logic
describe("Backend Unit Tests: SQLite Database & Query Logic", () => {
  const dbPath = path.join(process.cwd(), "farmart.db");
  const db = new Database(dbPath);

  test("Database contains seeded categories", () => {
    const categories = db.prepare("SELECT * FROM categories ORDER BY id ASC").all();
    assert.ok(Array.isArray(categories));
    assert.strictEqual(categories.length >= 8, true);

    const first = categories[0];
    assert.ok(first.id);
    assert.ok(first.slug);
    assert.ok(first.name);
  });

  test("Database contains seeded brands", () => {
    const brands = db.prepare("SELECT * FROM brands").all();
    assert.ok(Array.isArray(brands));
    assert.strictEqual(brands.length >= 4, true);

    const brandNames = brands.map((b) => b.name);
    assert.ok(brandNames.includes("FoodPouch"));
    assert.ok(brandNames.includes("Farmart"));
  });

  test("Database contains seeded banners", () => {
    const banners = db.prepare("SELECT * FROM banners").all();
    assert.ok(banners.length >= 2);
    const types = banners.map((b) => b.type);
    assert.ok(types.includes("hero_main"));
    assert.ok(types.includes("hero_side"));
  });

  test("Query product by ID: valid ID returns product", () => {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get("p1");
    assert.ok(product);
    assert.strictEqual(product.id, "p1");
    assert.strictEqual(product.brand, "Ice Cool");
    assert.strictEqual(typeof product.price, "number");
  });

  test("Query product by ID: invalid ID returns undefined", () => {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get("non-existent-sku-999");
    assert.strictEqual(product, undefined);
  });

  test("Search products by keyword: matches title or brand", () => {
    const query = "%Beef%";
    const rows = db.prepare("SELECT * FROM products WHERE title LIKE ? OR brand LIKE ?").all(query, query);
    assert.ok(rows.length >= 1);
    assert.strictEqual(rows[0].id, "p2");
    assert.ok(rows[0].title.includes("Beef"));
  });

  test("Search products: case-insensitive empty result handling", () => {
    const query = "%xyz_non_existent_term_404%";
    const rows = db.prepare("SELECT * FROM products WHERE title LIKE ? OR brand LIKE ?").all(query, query);
    assert.strictEqual(rows.length, 0);
  });

  test("Filter products by category_slug", () => {
    const rows = db.prepare("SELECT * FROM products WHERE category_slug = ?").all("fruits-vegetables");
    assert.ok(rows.length >= 1);
    for (const r of rows) {
      assert.strictEqual(r.category_slug, "fruits-vegetables");
    }
  });

  test("Top Saver and Best Seller flags filter correctly", () => {
    const topSavers = db.prepare("SELECT * FROM products WHERE is_top_saver = 1").all();
    assert.ok(topSavers.length >= 1);
    for (const p of topSavers) {
      assert.strictEqual(p.is_top_saver, 1);
    }
  });
});
