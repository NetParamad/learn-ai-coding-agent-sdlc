import { test, expect } from "@playwright/test";

test.describe("Farmart E2E Regression Test Suite", () => {
  test("Home Page loads with critical sections and navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Farmart/i);

    // Header exists
    const logo = page.locator("header").getByText("Farmart");
    await expect(logo).toBeVisible();

    // Hero section exists
    await expect(page.getByText("Active Summer With Juice Milk")).toBeVisible();

    // Top Saver Today section exists
    await expect(page.getByText("Top Saver Today")).toBeVisible();

    // Categories exists
    await expect(page.getByText("Fruits & Vegetables").first()).toBeVisible();
  });

  test("Product Search works via header form and search results page", async ({ page }) => {
    await page.goto("/search?q=Beef");

    // Title and heading check
    await expect(page.getByRole("heading", { name: /Search Results for "Beef"/i })).toBeVisible();

    // Product item exists
    await expect(page.getByText("British Beef Mince (10% Fat)").first()).toBeVisible();
    await expect(page.getByText("$28.00").first()).toBeVisible();
  });

  test("Search displays friendly empty state when no items match", async ({ page }) => {
    await page.goto("/search?q=non_existent_item_9999");
    await expect(page.getByText("No matching products found")).toBeVisible();
    await expect(page.getByText("Popular Searches:")).toBeVisible();
  });

  test("Product Detail Page renders details, pricing, variants, and tabs", async ({ page }) => {
    await page.goto("/products/p1");

    // Product Title
    await expect(page.getByRole("heading", { name: "Ice Cool 350ml x 24 Pieces", exact: true })).toBeVisible();

    // Brand
    await expect(page.getByText("Ice Cool").first()).toBeVisible();

    // Price Hero
    await expect(page.getByText("$48.50").first()).toBeVisible();

    // Add to Basket CTA
    const addToBasketBtn = page.getByRole("button", { name: /Add to Basket/i });
    await expect(addToBasketBtn).toBeVisible();

    // Click Add to Basket and expect toast
    await addToBasketBtn.click();
    await expect(page.getByText(/Added .* to shopping cart/i)).toBeVisible();

    // Tabs navigation
    await expect(page.getByRole("tab", { name: "Product Story & Origin" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Nutrition & Specifications" })).toBeVisible();
  });

  test("Swagger API Documentation (/docs) and spec endpoint are accessible", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByRole("heading", { name: "Farmart API Documentation" })).toBeVisible();
    await expect(page.getByText("OpenAPI 3.0.3")).toBeVisible();

    // Verify raw JSON route
    const response = await page.request.get("/docs/swagger.json");
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.openapi).toBe("3.0.3");
  });

  test("Mermaid Database ER Diagram page (/mermaid.html) loads", async ({ page }) => {
    await page.goto("/mermaid.html");
    await expect(page.getByText("Farmart Database Entity Relationship Diagram")).toBeVisible();
    await expect(page.locator(".mermaid")).toBeVisible();
  });
});
