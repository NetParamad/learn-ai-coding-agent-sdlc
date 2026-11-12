export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Farmart Grocery eCommerce API",
    version: "1.0.0",
    description:
      "Production-grade OpenAPI / Swagger specification for Farmart organic grocery platform. Supports catalog browsing, real-time product inventory, delivery window calculation, shopping cart operations, and verified customer reviews.",
    contact: {
      name: "Farmart Engineering Team",
      url: "https://farmart.grocery",
      email: "api@farmart.grocery",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
    {
      url: "https://farmart.grocery",
      description: "Production edge server",
    },
  ],
  tags: [
    {
      name: "Products",
      description: "Product catalog, featured deals, and category-filtered inventory",
    },
    {
      name: "Categories",
      description: "Grocery taxonomy and hierarchy",
    },
    {
      name: "Brands",
      description: "Featured partner brands and producer promotions",
    },
    {
      name: "Banners",
      description: "Promotional hero banners and campaign sidecards",
    },
    {
      name: "Cart",
      description: "Shopping cart persistence and basket calculation",
    },
    {
      name: "Delivery",
      description: "Cold-chain fulfillment, zip code lookup, and time slots",
    },
    {
      name: "Reviews",
      description: "Verified customer experiences and rating breakdown",
    },
  ],
  paths: {
    "/api/products": {
      get: {
        tags: ["Products"],
        summary: "List all products with filters",
        description: "Returns a paginated list of catalog products filtered by category, price, deals, or search terms.",
        parameters: [
          {
            name: "categorySlug",
            in: "query",
            description: "Filter by category slug (e.g. 'fruits-vegetables', 'raw-meats')",
            required: false,
            schema: { type: "string", example: "fruits-vegetables" },
          },
          {
            name: "brand",
            in: "query",
            description: "Filter by brand name (e.g. 'Farmart', 'Itea J&C')",
            required: false,
            schema: { type: "string" },
          },
          {
            name: "isTopSaver",
            in: "query",
            description: "Filter only top saver deal items",
            required: false,
            schema: { type: "boolean", example: true },
          },
          {
            name: "isBestSeller",
            in: "query",
            description: "Filter best selling items",
            required: false,
            schema: { type: "boolean" },
          },
          {
            name: "isJustLanding",
            in: "query",
            description: "Filter new arrivals",
            required: false,
            schema: { type: "boolean" },
          },
          {
            name: "search",
            in: "query",
            description: "Keyword search in product title or brand",
            required: false,
            schema: { type: "string" },
          },
          {
            name: "limit",
            in: "query",
            description: "Max number of items to return",
            required: false,
            schema: { type: "integer", default: 20 },
          },
        ],
        responses: {
          200: {
            description: "List of catalog products",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    products: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Product" },
                    },
                    total: { type: "integer", example: 42 },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Get product details by ID",
        description: "Returns complete details for a single product, including stock, nutritional facts, and packaging variants.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Product ID (e.g. 'p1', 'p2')",
            schema: { type: "string", example: "p1" },
          },
        ],
        responses: {
          200: {
            description: "Product detail data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductDetail" },
              },
            },
          },
          404: {
            description: "Product not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/products/{id}/related": {
      get: {
        tags: ["Products"],
        summary: "Get related products",
        description: "Returns recommendation items in the same category excluding the current product.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", example: "p1" },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: { type: "integer", default: 5 },
          },
        ],
        responses: {
          200: {
            description: "Related products array",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
        },
      },
    },
    "/api/products/top-saver": {
      get: {
        tags: ["Products"],
        summary: "Get Top Saver Today deals",
        description: "Returns the featured hero deal product along with standard deal items.",
        responses: {
          200: {
            description: "Top saver deals response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    heroProduct: { $ref: "#/components/schemas/Product" },
                    deals: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Product" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/products/best-sellers": {
      get: {
        tags: ["Products"],
        summary: "Get Best Seller products",
        description: "Returns high-ranking best sellers with optional category filtering.",
        parameters: [
          {
            name: "categorySlug",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Array of best seller products",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
        },
      },
    },
    "/api/products/just-landing": {
      get: {
        tags: ["Products"],
        summary: "Get Just Landing new arrivals",
        description: "Returns fresh catalog arrivals added within the last 7 days.",
        parameters: [
          {
            name: "categorySlug",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Array of new arrival products",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
        },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "List all product categories",
        description: "Returns all active categories with icon names and item counts.",
        responses: {
          200: {
            description: "List of categories",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Category" },
                },
              },
            },
          },
        },
      },
    },
    "/api/categories/{slug}": {
      get: {
        tags: ["Categories"],
        summary: "Get category by slug",
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string", example: "fruits-vegetables" },
          },
        ],
        responses: {
          200: {
            description: "Category information",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
              },
            },
          },
          404: {
            description: "Category not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/brands": {
      get: {
        tags: ["Brands"],
        summary: "List featured brands",
        description: "Returns featured farm and beverage brand tiles with promotional banners.",
        responses: {
          200: {
            description: "Array of featured brands",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Brand" },
                },
              },
            },
          },
        },
      },
    },
    "/api/banners": {
      get: {
        tags: ["Banners"],
        summary: "List promotional banners",
        parameters: [
          {
            name: "type",
            in: "query",
            description: "Banner placement type",
            schema: {
              type: "string",
              enum: ["hero_main", "hero_side"],
            },
          },
        ],
        responses: {
          200: {
            description: "Array of promotional banners",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Banner" },
                },
              },
            },
          },
        },
      },
    },
    "/api/cart": {
      get: {
        tags: ["Cart"],
        summary: "Get current shopping cart",
        responses: {
          200: {
            description: "Active shopping cart data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Cart" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Cart"],
        summary: "Clear all items from shopping cart",
        responses: {
          200: {
            description: "Cart successfully cleared",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Cart" },
              },
            },
          },
        },
      },
    },
    "/api/cart/items": {
      post: {
        tags: ["Cart"],
        summary: "Add item to cart",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AddToCartRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Updated cart",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Cart" },
              },
            },
          },
        },
      },
    },
    "/api/cart/items/{itemId}": {
      patch: {
        tags: ["Cart"],
        summary: "Update item quantity in cart",
        parameters: [
          {
            name: "itemId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["quantity"],
                properties: {
                  quantity: { type: "integer", minimum: 1, maximum: 99, example: 3 },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Updated cart",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Cart" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Cart"],
        summary: "Remove an item from cart",
        parameters: [
          {
            name: "itemId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Updated cart after item removal",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Cart" },
              },
            },
          },
        },
      },
    },
    "/api/delivery/check-zip": {
      post: {
        tags: ["Delivery"],
        summary: "Verify postal code delivery window",
        description: "Checks if a regional address is eligible for 2-hour cold-chain fulfillment and lists available time slots.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["zipCode"],
                properties: {
                  zipCode: { type: "string", example: "98101" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Delivery eligibility response",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DeliveryCheckResponse" },
              },
            },
          },
        },
      },
    },
    "/api/delivery/slots": {
      get: {
        tags: ["Delivery"],
        summary: "Get available delivery slots",
        parameters: [
          {
            name: "zipCode",
            in: "query",
            required: false,
            schema: { type: "string", example: "98101" },
          },
        ],
        responses: {
          200: {
            description: "Array of available fulfillment slots",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/DeliverySlot" },
                },
              },
            },
          },
        },
      },
    },
    "/api/products/{id}/reviews": {
      get: {
        tags: ["Reviews"],
        summary: "Get customer reviews and rating breakdown",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", example: "p1" },
          },
        ],
        responses: {
          200: {
            description: "Review breakdown and verified customer reviews list",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ReviewSummaryResponse" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Reviews"],
        summary: "Submit a new customer review",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", example: "p1" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateReviewRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "Review submitted successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Review" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: "object",
        required: ["id", "title", "brand", "price", "currency", "imageUrl", "categorySlug", "rating", "reviewCount"],
        properties: {
          id: { type: "string", example: "p1" },
          title: { type: "string", example: "Ice Cool 350ml x 24 Pieces" },
          brand: { type: "string", example: "Ice Cool" },
          price: { type: "number", format: "float", example: 48.5 },
          originalPrice: { type: "number", format: "float", example: 59.9 },
          currency: { type: "string", example: "$" },
          imageUrl: { type: "string", example: "/images/products/ice-cool.png" },
          categorySlug: { type: "string", example: "wines-alcohol" },
          rating: { type: "number", format: "float", example: 5.0 },
          reviewCount: { type: "integer", example: 20 },
          soldCount: { type: "integer", example: 20 },
          totalStock: { type: "integer", example: 45 },
          isTopSaver: { type: "boolean", example: true },
          isBestSeller: { type: "boolean", example: false },
          isJustLanding: { type: "boolean", example: false },
          badge: { type: "string", example: "SALE 20% OFF" },
        },
      },
      ProductDetail: {
        allOf: [
          { $ref: "#/components/schemas/Product" },
          {
            type: "object",
            properties: {
              variants: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string", example: "standard" },
                    label: { type: "string", example: "Standard Pack" },
                    multiplier: { type: "number", example: 1.0 },
                    hint: { type: "string", example: "Regular Size" },
                  },
                },
              },
              specifications: {
                type: "object",
                properties: {
                  origin: { type: "string", example: "Rainier Valley Orchards, WA" },
                  certification: { type: "string", example: "USDA Organic • Non-GMO" },
                  shelfLife: { type: "string", example: "7 – 10 days refrigerated" },
                  storageTemp: { type: "string", example: "2°C – 4°C" },
                },
              },
            },
          },
        ],
      },
      Category: {
        type: "object",
        required: ["id", "name", "slug", "icon", "itemCount"],
        properties: {
          id: { type: "string", example: "c1" },
          name: { type: "string", example: "Fruits & Vegetables" },
          slug: { type: "string", example: "fruits-vegetables" },
          icon: { type: "string", example: "Apple" },
          itemCount: { type: "integer", example: 42 },
        },
      },
      Brand: {
        type: "object",
        required: ["id", "name", "promoText", "bgColor", "imageUrl"],
        properties: {
          id: { type: "string", example: "b1" },
          name: { type: "string", example: "FoodPouch" },
          promoText: { type: "string", example: "New Snacks Release" },
          bgColor: { type: "string", example: "bg-purple-100 border-purple-200" },
          imageUrl: { type: "string", example: "/images/brands/snack.png" },
        },
      },
      Banner: {
        type: "object",
        required: ["id", "title", "buttonText", "imageUrl", "type"],
        properties: {
          id: { type: "string", example: "ban1" },
          title: { type: "string", example: "Active Summer With Juice Milk 300ml" },
          subtitle: { type: "string", example: "New arrivals with delicious fruits, juice drinks, essential for summer." },
          discountBadge: { type: "string", example: "20% SALE OFF" },
          buttonText: { type: "string", example: "Shop Now" },
          imageUrl: { type: "string", example: "/images/banners/juice-box.png" },
          bgColor: { type: "string", example: "bg-amber-400 text-stone-900" },
          type: { type: "string", enum: ["hero_main", "hero_side"], example: "hero_main" },
        },
      },
      CartItem: {
        type: "object",
        required: ["id", "productId", "name", "price", "quantity"],
        properties: {
          id: { type: "string", example: "item-1" },
          productId: { type: "string", example: "p1" },
          name: { type: "string", example: "Ice Cool 350ml x 24 Pieces" },
          price: { type: "number", example: 48.5 },
          quantity: { type: "integer", example: 2 },
          variant: { type: "string", example: "Standard Pack" },
        },
      },
      Cart: {
        type: "object",
        required: ["items", "subtotal", "deliveryFee", "total", "itemCount"],
        properties: {
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/CartItem" },
          },
          subtotal: { type: "number", example: 97.0 },
          deliveryFee: { type: "number", example: 0.0 },
          discount: { type: "number", example: 10.0 },
          total: { type: "number", example: 87.0 },
          itemCount: { type: "integer", example: 2 },
        },
      },
      AddToCartRequest: {
        type: "object",
        required: ["productId", "quantity"],
        properties: {
          productId: { type: "string", example: "p1" },
          quantity: { type: "integer", minimum: 1, default: 1, example: 1 },
          variantId: { type: "string", example: "standard" },
        },
      },
      DeliverySlot: {
        type: "object",
        required: ["id", "title", "badge", "desc"],
        properties: {
          id: { type: "string", example: "today-afternoon" },
          title: { type: "string", example: "Today, 4:00 PM – 6:00 PM" },
          badge: { type: "string", example: "Fastest" },
          desc: { type: "string", example: "Chilled van delivery direct from regional sorting farm." },
        },
      },
      DeliveryCheckResponse: {
        type: "object",
        required: ["zipCode", "eligible", "statusMessage", "availableSlots"],
        properties: {
          zipCode: { type: "string", example: "98101" },
          eligible: { type: "boolean", example: true },
          estimatedMinutes: { type: "integer", example: 90 },
          freeDeliveryThreshold: { type: "number", example: 35.0 },
          statusMessage: { type: "string", example: "Free 2-Hour Delivery Available in Downtown & Metro Area" },
          availableSlots: {
            type: "array",
            items: { $ref: "#/components/schemas/DeliverySlot" },
          },
        },
      },
      Review: {
        type: "object",
        required: ["id", "author", "rating", "date", "title", "comment", "verified"],
        properties: {
          id: { type: "string", example: "rev-1" },
          author: { type: "string", example: "Samantha K." },
          rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
          date: { type: "string", example: "2 days ago" },
          title: { type: "string", example: "Exceptionally fresh and crisp!" },
          comment: { type: "string", example: "Ordered in the morning and arrived cold and perfectly packed by afternoon." },
          verified: { type: "boolean", example: true },
          helpfulCount: { type: "integer", example: 14 },
        },
      },
      ReviewSummaryResponse: {
        type: "object",
        required: ["rating", "reviewCount", "distribution", "reviews"],
        properties: {
          rating: { type: "number", example: 4.8 },
          reviewCount: { type: "integer", example: 20 },
          distribution: {
            type: "array",
            items: {
              type: "object",
              properties: {
                stars: { type: "integer", example: 5 },
                percentage: { type: "integer", example: 75 },
                count: { type: "integer", example: 15 },
              },
            },
          },
          reviews: {
            type: "array",
            items: { $ref: "#/components/schemas/Review" },
          },
        },
      },
      CreateReviewRequest: {
        type: "object",
        required: ["author", "rating", "title", "comment"],
        properties: {
          author: { type: "string", example: "Jordan P." },
          rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
          title: { type: "string", example: "Outstanding freshness" },
          comment: { type: "string", example: "Tastes just like fresh from the farm orchard." },
        },
      },
      ErrorResponse: {
        type: "object",
        required: ["error", "message"],
        properties: {
          error: { type: "string", example: "NOT_FOUND" },
          message: { type: "string", example: "Resource not found" },
        },
      },
    },
  },
};
