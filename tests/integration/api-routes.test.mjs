import { test, describe } from "node:test";
import assert from "node:assert/strict";

describe("Backend Integration Tests: Next.js API Routes", () => {
  const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

  test("GET /api/products returns 200 with catalog and pagination", async () => {
    const res = await fetch(`${BASE_URL}/api/products`);
    assert.strictEqual(res.status, 200);

    const data = await res.json();
    assert.ok(Array.isArray(data.products));
    assert.strictEqual(typeof data.total, "number");
    assert.ok(data.total >= 6);
  });

  test("GET /api/products?search=Beef returns matching products", async () => {
    const res = await fetch(`${BASE_URL}/api/products?search=Beef`);
    assert.strictEqual(res.status, 200);

    const data = await res.json();
    assert.ok(data.products.length >= 1);
    assert.ok(data.products[0].title.includes("Beef"));
  });

  test("GET /api/products?search=xyz_unknown returns empty list with total=0", async () => {
    const res = await fetch(`${BASE_URL}/api/products?search=xyz_unknown_random_query`);
    assert.strictEqual(res.status, 200);

    const data = await res.json();
    assert.strictEqual(data.products.length, 0);
    assert.strictEqual(data.total, 0);
  });

  test("GET /api/products/p1 returns 200 with product details and related items", async () => {
    const res = await fetch(`${BASE_URL}/api/products/p1`);
    assert.strictEqual(res.status, 200);

    const product = await res.json();
    assert.strictEqual(product.id, "p1");
    assert.strictEqual(product.brand, "Ice Cool");
    assert.ok(Array.isArray(product.related));
  });

  test("GET /api/products/invalid-id-999 returns 404 NOT_FOUND", async () => {
    const res = await fetch(`${BASE_URL}/api/products/invalid-id-999`);
    assert.strictEqual(res.status, 404);

    const err = await res.json();
    assert.strictEqual(err.error, "NOT_FOUND");
  });

  test("GET /api/categories returns 200 array of categories", async () => {
    const res = await fetch(`${BASE_URL}/api/categories`);
    assert.strictEqual(res.status, 200);

    const categories = await res.json();
    assert.ok(Array.isArray(categories));
    assert.ok(categories.length >= 8);
    assert.ok(categories.some((c) => c.slug === "fruits-vegetables"));
  });

  test("GET /api/brands returns 200 array of featured brands", async () => {
    const res = await fetch(`${BASE_URL}/api/brands`);
    assert.strictEqual(res.status, 200);

    const brands = await res.json();
    assert.ok(Array.isArray(brands));
    assert.ok(brands.length >= 4);
  });

  test("GET /api/banners returns 200 array of banners", async () => {
    const res = await fetch(`${BASE_URL}/api/banners`);
    assert.strictEqual(res.status, 200);

    const banners = await res.json();
    assert.ok(Array.isArray(banners));
    assert.ok(banners.length >= 2);
  });

  test("GET /docs/swagger.json returns 200 with OpenAPI 3.0.3 specification", async () => {
    const res = await fetch(`${BASE_URL}/docs/swagger.json`);
    assert.strictEqual(res.status, 200);

    const spec = await res.json();
    assert.strictEqual(spec.openapi, "3.0.3");
    assert.strictEqual(spec.info.title, "Farmart Grocery eCommerce API");
    assert.ok(spec.paths["/api/products"]);
  });

  test("GET /mermaid.html returns 200 with Mermaid ER diagram markup", async () => {
    const res = await fetch(`${BASE_URL}/mermaid.html`);
    assert.strictEqual(res.status, 200);

    const html = await res.text();
    assert.ok(html.includes("erDiagram"));
    assert.ok(html.includes("CATEGORIES"));
    assert.ok(html.includes("PRODUCTS"));
  });
});
