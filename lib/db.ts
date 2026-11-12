import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  itemCount: number;
}

export interface Brand {
  id: string;
  name: string;
  promoText: string;
  bgColor: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  currency: string;
  imageUrl: string;
  categorySlug: string;
  rating: number;
  reviewCount: number;
  soldCount?: number;
  totalStock?: number;
  isTopSaver: boolean;
  isBestSeller: boolean;
  isJustLanding: boolean;
  badge?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  discountBadge?: string;
  buttonText: string;
  imageUrl: string;
  bgColor?: string;
  type: "hero_main" | "hero_side";
}

function getDbPath(): string {
  const rootDbPath = path.join(process.cwd(), "farmart.db");
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDbPath = path.join("/tmp", "farmart.db");
    try {
      if (!fs.existsSync(tmpDbPath) && fs.existsSync(rootDbPath)) {
        fs.copyFileSync(rootDbPath, tmpDbPath);
      }
      return tmpDbPath;
    } catch {
      return rootDbPath;
    }
  }
  return rootDbPath;
}

declare global {
  var __farmartDb: Database.Database | undefined;
}

function getDatabase(): Database.Database {
  if (!global.__farmartDb) {
    const dbPath = getDbPath();
    const db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    db.pragma("busy_timeout = 5000");
    initializeDatabase(db);
    global.__farmartDb = db;
  }
  return global.__farmartDb;
}

function initializeDatabase(db: Database.Database) {
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

  // Seed only if empty
  const countRow = db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };
  if (countRow.count === 0) {
    seedDatabase(db);
  }
}

function seedDatabase(db: Database.Database) {
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

  for (const cat of categories) {
    insertCategory.run(cat);
  }

  const insertBrand = db.prepare(`
    INSERT INTO brands (id, name, promo_text, bg_color, image_url)
    VALUES (@id, @name, @promoText, @bgColor, @imageUrl)
  `);

  const brands = [
    {
      id: "b1",
      name: "FoodPouch",
      promoText: "New Snacks Release",
      bgColor: "bg-purple-100 dark:bg-purple-950/40 border-purple-200",
      imageUrl: "/images/brands/snack.png",
    },
    {
      id: "b2",
      name: "Itea J&C",
      promoText: "Happy Tea 100% Organic, From $29.9",
      bgColor: "bg-amber-50 dark:bg-amber-950/40 border-amber-200",
      imageUrl: "/images/brands/tea.png",
    },
    {
      id: "b3",
      name: "Soda Brand",
      promoText: "Soda Can Box 24 Pieces - 20% OFF",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200",
      imageUrl: "/images/brands/soda.png",
    },
    {
      id: "b4",
      name: "Farmart",
      promoText: "Fresh Meat Sausage, BUY 2 GET 1",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200",
      imageUrl: "/images/brands/sausage.png",
    },
  ];

  for (const b of brands) {
    insertBrand.run(b);
  }

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
      bgColor: "bg-gradient-to-r from-blue-50 to-orange-50 dark:from-slate-900 dark:to-stone-900",
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
    // Top Saver Today
    {
      id: "p1",
      title: "Ice Cool 350ml x 24 Pieces",
      brand: "Ice Cool",
      price: 48.50,
      originalPrice: 59.90,
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
      price: 28.00,
      originalPrice: 32.00,
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
      badge: "Save 12%",
    },
    {
      id: "p3",
      title: "Farmart Farmhouse Soft White",
      brand: "Farmart",
      price: 12.70,
      originalPrice: null,
      currency: "$",
      imageUrl: "/images/products/bread.png",
      categorySlug: "breads-sweets",
      rating: 4.9,
      reviewCount: 8,
      soldCount: 8,
      totalStock: 20,
      isTopSaver: 1,
      isBestSeller: 0,
      isJustLanding: 0,
      badge: null,
    },
    {
      id: "p4",
      title: "Citrus Valencia Fresh Oranges",
      brand: "Valencia Orchard",
      price: 12.19,
      originalPrice: 15.00,
      currency: "$",
      imageUrl: "/images/products/oranges.png",
      categorySlug: "fruits-vegetables",
      rating: 4.7,
      reviewCount: 15,
      soldCount: 42,
      totalStock: 200,
      isTopSaver: 1,
      isBestSeller: 0,
      isJustLanding: 0,
      badge: null,
    },

    // Best Sellers & Just Landing
    {
      id: "p5",
      title: "US Yellow Water Melon",
      brand: "Farmart Fresh",
      price: 15.90,
      originalPrice: 18.70,
      currency: "$",
      imageUrl: "/images/products/melon.png",
      categorySlug: "fruits-vegetables",
      rating: 4.6,
      reviewCount: 23,
      soldCount: 40,
      totalStock: 100,
      isTopSaver: 0,
      isBestSeller: 1,
      isJustLanding: 1,
      badge: "Save 15%",
    },
    {
      id: "p6",
      title: "Spices Snack 6 Ready Salted",
      brand: "Farmart",
      price: 11.00,
      originalPrice: 13.50,
      currency: "$",
      imageUrl: "/images/products/snack-pack.png",
      categorySlug: "breads-sweets",
      rating: 4.9,
      reviewCount: 30,
      soldCount: 80,
      totalStock: 150,
      isTopSaver: 0,
      isBestSeller: 1,
      isJustLanding: 0,
      badge: "Save 18%",
    },
    {
      id: "p7",
      title: "Oatmeal Cookies Premium Tub",
      brand: "Farmart",
      price: 29.00,
      originalPrice: null,
      currency: "$",
      imageUrl: "/images/products/cookies.png",
      categorySlug: "breads-sweets",
      rating: 4.9,
      reviewCount: 18,
      soldCount: 12,
      totalStock: 50,
      isTopSaver: 0,
      isBestSeller: 1,
      isJustLanding: 1,
      badge: null,
    },
    {
      id: "p8",
      title: "Canned Soup With Toffee Special",
      brand: "Heritage Pantry",
      price: 22.14,
      originalPrice: 25.00,
      currency: "$",
      imageUrl: "/images/products/canned-soup.png",
      categorySlug: "fruits-vegetables",
      rating: 4.5,
      reviewCount: 14,
      soldCount: 19,
      totalStock: 60,
      isTopSaver: 0,
      isBestSeller: 1,
      isJustLanding: 1,
      badge: null,
    },
    {
      id: "p9",
      title: "Organic Cold Pressed Olive Oil",
      brand: "Farmart",
      price: 34.50,
      originalPrice: 39.00,
      currency: "$",
      imageUrl: "/images/products/olive-oil.png",
      categorySlug: "fruits-vegetables",
      rating: 5.0,
      reviewCount: 42,
      soldCount: 65,
      totalStock: 120,
      isTopSaver: 0,
      isBestSeller: 0,
      isJustLanding: 1,
      badge: "New",
    },
    {
      id: "p10",
      title: "Pure Mountain Honey Jar 500g",
      brand: "Farmart",
      price: 18.20,
      originalPrice: null,
      currency: "$",
      imageUrl: "/images/products/honey.png",
      categorySlug: "breads-sweets",
      rating: 4.8,
      reviewCount: 31,
      soldCount: 50,
      totalStock: 80,
      isTopSaver: 0,
      isBestSeller: 0,
      isJustLanding: 1,
      badge: null,
    },
  ];

  for (const prod of products) {
    insertProduct.run(prod);
  }
}

// Queries
export function getCategories(): Category[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM categories ORDER BY id ASC").all() as any[];
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    icon: r.icon,
    itemCount: r.item_count,
  }));
}

export function getBrands(): Brand[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM brands ORDER BY id ASC").all() as any[];
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    promoText: r.promo_text,
    bgColor: r.bg_color,
    imageUrl: r.image_url,
  }));
}

export function getBanners(): Banner[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM banners ORDER BY id ASC").all() as any[];
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    subtitle: r.subtitle ?? undefined,
    discountBadge: r.discount_badge ?? undefined,
    buttonText: r.button_text,
    imageUrl: r.image_url,
    bgColor: r.bg_color ?? undefined,
    type: r.type as "hero_main" | "hero_side",
  }));
}

export function getTopSavers(): Product[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM products WHERE is_top_saver = 1 ORDER BY id ASC").all() as any[];
  return rows.map(mapProduct);
}

export function getBestSellers(categorySlug?: string): Product[] {
  const db = getDatabase();
  let query = "SELECT * FROM products WHERE is_best_seller = 1";
  const params: any[] = [];
  if (categorySlug && categorySlug !== "all") {
    query += " AND category_slug = ?";
    params.push(categorySlug);
  }
  query += " ORDER BY id ASC";
  const rows = db.prepare(query).all(...params) as any[];
  return rows.map(mapProduct);
}

export function getJustLanding(categorySlug?: string): Product[] {
  const db = getDatabase();
  let query = "SELECT * FROM products WHERE is_just_landing = 1";
  const params: any[] = [];
  if (categorySlug && categorySlug !== "all") {
    query += " AND category_slug = ?";
    params.push(categorySlug);
  }
  query += " ORDER BY id ASC";
  const rows = db.prepare(query).all(...params) as any[];
  return rows.map(mapProduct);
}

export interface ProductFilterOptions {
  query?: string;
  categorySlug?: string;
  brand?: string;
  isTopSaver?: boolean;
  isBestSeller?: boolean;
  isJustLanding?: boolean;
  limit?: number;
  offset?: number;
}

export function searchProducts(options: ProductFilterOptions = {}): {
  products: Product[];
  total: number;
} {
  const db = getDatabase();
  const conditions: string[] = [];
  const params: any[] = [];

  if (options.query && options.query.trim()) {
    conditions.push("(title LIKE ? OR brand LIKE ?)");
    const q = `%${options.query.trim()}%`;
    params.push(q, q);
  }

  if (options.categorySlug && options.categorySlug !== "all") {
    conditions.push("category_slug = ?");
    params.push(options.categorySlug);
  }

  if (options.brand) {
    conditions.push("brand = ?");
    params.push(options.brand);
  }

  if (options.isTopSaver) {
    conditions.push("is_top_saver = 1");
  }

  if (options.isBestSeller) {
    conditions.push("is_best_seller = 1");
  }

  if (options.isJustLanding) {
    conditions.push("is_just_landing = 1");
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // Count total
  const countRow = db.prepare(`SELECT COUNT(*) as total FROM products ${whereClause}`).get(...params) as { total: number };
  const total = countRow ? countRow.total : 0;

  // Query records
  const limit = options.limit && options.limit > 0 ? options.limit : 20;
  const offset = options.offset && options.offset >= 0 ? options.offset : 0;

  const dataSql = `SELECT * FROM products ${whereClause} ORDER BY id ASC LIMIT ? OFFSET ?`;
  const rows = db.prepare(dataSql).all(...params, limit, offset) as any[];

  return {
    products: rows.map(mapProduct),
    total,
  };
}

export function getProductById(id: string): Product | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id) as any;
  return row ? mapProduct(row) : null;
}

export function getAllProducts(): Product[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM products ORDER BY id ASC").all() as any[];
  return rows.map(mapProduct);
}

export function getRelatedProducts(categorySlug: string, currentProductId?: string, limit = 5): Product[] {
  const db = getDatabase();
  let query = "SELECT * FROM products WHERE category_slug = ?";
  const params: any[] = [categorySlug];
  if (currentProductId) {
    query += " AND id != ?";
    params.push(currentProductId);
  }
  const safeLimit = Math.max(1, Math.min(100, limit));
  query += " LIMIT ?";
  params.push(safeLimit);
  const rows = db.prepare(query).all(...params) as any[];
  return rows.map(mapProduct);
}

export function getCategoryBySlug(slug: string): Category | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM categories WHERE slug = ?").get(slug) as any;
  return row
    ? {
        id: row.id,
        name: row.name,
        slug: row.slug,
        icon: row.icon,
        itemCount: row.item_count,
      }
    : null;
}

function mapProduct(r: any): Product {
  return {
    id: r.id,
    title: r.title,
    brand: r.brand,
    price: r.price,
    originalPrice: r.original_price ?? undefined,
    currency: r.currency || "$",
    imageUrl: r.image_url,
    categorySlug: r.category_slug,
    rating: r.rating,
    reviewCount: r.review_count,
    soldCount: r.sold_count ?? undefined,
    totalStock: r.total_stock ?? undefined,
    isTopSaver: Boolean(r.is_top_saver),
    isBestSeller: Boolean(r.is_best_seller),
    isJustLanding: Boolean(r.is_just_landing),
    badge: r.badge ?? undefined,
  };
}
