#!/usr/bin/env node

/**
 * Farmart Database Seed Script
 * Populates farmart.db with categories, brands, promotional banners, and initial catalog products.
 * Usage: node scripts/seed-data.mjs [--reset]
 */

import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "farmart.db");
const isReset = process.argv.includes("--reset");

console.log(`[Seed] Connecting to SQLite database at: ${dbPath}`);
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

if (isReset) {
  console.log("[Seed] --reset flag detected. Dropping existing tables...");
  db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS brands;
    DROP TABLE IF EXISTS banners;
  `);
}

// 1. Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL,
    item_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS brands (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    promo_text TEXT NOT NULL,
    bg_color TEXT NOT NULL,
    image_url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    brand TEXT NOT NULL,
    price REAL NOT NULL,
    original_price REAL,
    currency TEXT DEFAULT '$',
    image_url TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    rating REAL DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    sold_count INTEGER,
    total_stock INTEGER,
    is_top_saver INTEGER DEFAULT 0,
    is_best_seller INTEGER DEFAULT 0,
    is_just_landing INTEGER DEFAULT 0,
    badge TEXT
  );

  CREATE TABLE IF NOT EXISTS banners (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    discount_badge TEXT,
    button_text TEXT NOT NULL,
    image_url TEXT NOT NULL,
    bg_color TEXT,
    type TEXT NOT NULL
  );
`);

// 2. Clear existing entries to prevent primary key collision
db.exec(`
  DELETE FROM categories;
  DELETE FROM brands;
  DELETE FROM banners;
  DELETE FROM products;
`);

// 3. Seed Categories
const insertCategory = db.prepare(`
  INSERT INTO categories (id, name, slug, icon, item_count)
  VALUES (@id, @name, @slug, @icon, @itemCount)
`);

const categories = [
  { id: "c1", name: "Fruits & Vegetables", slug: "fruits-vegetables", icon: "Apple", itemCount: 42 },
  { id: "c2", name: "Breads & Sweets", slug: "breads-sweets", icon: "Croissant", itemCount: 28 },
  { id: "c3", name: "Frozen Seafoods", slug: "frozen-seafoods", icon: "Fish", itemCount: 19 },
  { id: "c4", name: "Raw Meats", slug: "raw-meats", icon: "Beef", itemCount: 31 },
  { id: "c5", name: "Wines & Alcohol Drinks", slug: "wines-alcohol", icon: "Wine", itemCount: 54 },
  { id: "c6", name: "Coffees and Teas", slug: "coffees-teas", icon: "Coffee", itemCount: 25 },
  { id: "c7", name: "Milks and Dairies", slug: "milks-dairies", icon: "Milk", itemCount: 37 },
  { id: "c8", name: "Pet Foods", slug: "pet-foods", icon: "PawPrint", itemCount: 15 },
];

for (const c of categories) {
  insertCategory.run(c);
}
console.log(`[Seed] Inserted ${categories.length} categories.`);

// 4. Seed Brands
const insertBrand = db.prepare(`
  INSERT INTO brands (id, name, promo_text, bg_color, image_url)
  VALUES (@id, @name, @promoText, @bgColor, @imageUrl)
`);

const brands = [
  {
    id: "b1",
    name: "FoodPouch",
    promoText: "New Snacks Release",
    bgColor: "bg-purple-100 border-purple-200",
    imageUrl: "/images/brands/snack.png",
  },
  {
    id: "b2",
    name: "Itea J&C",
    promoText: "Happy Tea 100% Organic, From $29.9",
    bgColor: "bg-amber-50 border-amber-200",
    imageUrl: "/images/brands/tea.png",
  },
  {
    id: "b3",
    name: "Soda Brand",
    promoText: "Soda Can Box 24 Pieces - 20% OFF",
    bgColor: "bg-cyan-50 border-cyan-200",
    imageUrl: "/images/brands/soda.png",
  },
  {
    id: "b4",
    name: "Farmart",
    promoText: "Fresh Meat Sausage, BUY 2 GET 1",
    bgColor: "bg-emerald-50 border-emerald-200",
    imageUrl: "/images/brands/sausage.png",
  },
];

for (const b of brands) {
  insertBrand.run(b);
}
console.log(`[Seed] Inserted ${brands.length} brands.`);

// 5. Seed Banners
const insertBanner = db.prepare(`
  INSERT INTO banners (id, title, subtitle, discount_badge, button_text, image_url, bg_color, type)
  VALUES (@id, @title, @subtitle, @discountBadge, @buttonText, @imageUrl, @bgColor, @type)
`);

const banners = [
  {
    id: "ban1",
    title: "Active Summer With Juice Milk 300ml",
    subtitle: "New arrivals with delicious fruits, juice drinks, essential for summer.",
    discountBadge: null,
    buttonText: "Shop Now",
    imageUrl: "/images/banners/juice-box.png",
    bgColor: "bg-gradient-to-r from-blue-50 to-orange-50",
    type: "hero_main",
  },
  {
    id: "ban2",
    title: "Synthetic seeds Net 2.0 OZ",
    subtitle: null,
    discountBadge: "20% SALE OFF",
    buttonText: "Shop Now",
    imageUrl: "/images/banners/seed-box.png",
    bgColor: "bg-amber-400 text-stone-900",
    type: "hero_side",
  },
];

for (const ban of banners) {
  insertBanner.run(ban);
}
console.log(`[Seed] Inserted ${banners.length} banners.`);

// 6. Seed Products
const insertProduct = db.prepare(`
  INSERT INTO products (
    id, title, brand, price, original_price, currency, image_url, category_slug,
    rating, review_count, sold_count, total_stock, is_top_saver, is_best_seller, is_just_landing, badge
  ) VALUES (
    @id, @title, @brand, @price, @originalPrice, @currency, @imageUrl, @categorySlug,
    @rating, @reviewCount, @soldCount, @totalStock, @isTopSaver, @isBestSeller, @isJustLanding, @badge
  )
`);

const products = [
  {
    id: "p1",
    title: "Ice Cool 350ml x 24 Pieces",
    brand: "Ice Cool",
    price: 48.5,
    originalPrice: 59.9,
    currency: "$",
    imageUrl: "/images/products/ice-cool.png",
    categorySlug: "wines-alcohol",
    rating: 5.0,
    reviewCount: 20,
    soldCount: 20,
    totalStock: 45,
    isTopSaver: 1,
    isBestSeller: 0,
    isJustLanding: 0,
    badge: null,
  },
  {
    id: "p2",
    title: "British Beef Mince (10% Fat)",
    brand: "British Farm",
    price: 28.0,
    originalPrice: 32.0,
    currency: "$",
    imageUrl: "/images/products/beef.png",
    categorySlug: "raw-meats",
    rating: 4.8,
    reviewCount: 12,
    soldCount: 25,
    totalStock: 50,
    isTopSaver: 1,
    isBestSeller: 1,
    isJustLanding: 0,
    badge: "FRESH",
  },
  {
    id: "p3",
    title: "Atlantic Salmon Fillet 500g",
    brand: "Ocean Fresh",
    price: 19.5,
    originalPrice: 24.0,
    currency: "$",
    imageUrl: "/images/products/fish.png",
    categorySlug: "frozen-seafoods",
    rating: 4.9,
    reviewCount: 34,
    soldCount: 40,
    totalStock: 60,
    isTopSaver: 1,
    isBestSeller: 1,
    isJustLanding: 0,
    badge: "SALE 18%",
  },
  {
    id: "p4",
    title: "Organic Honeycrisp Apples 1kg",
    brand: "Rainier Valley",
    price: 7.99,
    originalPrice: 9.99,
    currency: "$",
    imageUrl: "/images/products/apple.png",
    categorySlug: "fruits-vegetables",
    rating: 5.0,
    reviewCount: 48,
    soldCount: 55,
    totalStock: 80,
    isTopSaver: 1,
    isBestSeller: 1,
    isJustLanding: 1,
    badge: "ORGANIC",
  },
  {
    id: "p5",
    title: "Artisan Sourdough Loaf 750g",
    brand: "Bakery House",
    price: 5.5,
    originalPrice: 6.5,
    currency: "$",
    imageUrl: "/images/products/bread.png",
    categorySlug: "breads-sweets",
    rating: 4.7,
    reviewCount: 19,
    soldCount: 15,
    totalStock: 30,
    isTopSaver: 0,
    isBestSeller: 1,
    isJustLanding: 1,
    badge: null,
  },
  {
    id: "p6",
    title: "Cold Brew Arabica Coffee 1L",
    brand: "Itea J&C",
    price: 11.2,
    originalPrice: 13.5,
    currency: "$",
    imageUrl: "/images/products/coffee.png",
    categorySlug: "coffees-teas",
    rating: 4.9,
    reviewCount: 27,
    soldCount: 22,
    totalStock: 40,
    isTopSaver: 0,
    isBestSeller: 1,
    isJustLanding: 1,
    badge: "NEW",
  },
];

for (const p of products) {
  insertProduct.run(p);
}
console.log(`[Seed] Inserted ${products.length} products.`);

db.close();
console.log("[Seed] Database seeding completed successfully!");
